import mongoose from "mongoose";
import { Employee } from "../models/employee";
import { SalaryHistory } from "../models/salaryHistory";

export class EmployeeService {

  // Other service functions...

  public async getEmployeeById(empid: string) {
    console.log("empid for one", empid);
    const employeeData = await Employee.aggregate([
      {
        $match: { empid } // Match the employee by empid field
      },
      {
        $lookup: {
          from: "salary_history",        // Collection name for SalaryHistory
          localField: "empid",           // Use empid from Employee
          foreignField: "empid",         // Use empid from SalaryHistory
          as: "salary_history"
        }
      },
      {
        $project: {
          empid: 1,
          name: 1,
          salary_history: 1
        }
      }
    ]);
    return employeeData.length ? employeeData[0] : null;
  }


  public async storeEmployeeData(employeeData: any) {
    // Normalize input to an array
    const employees = Array.isArray(employeeData) ? employeeData : [employeeData];
    try {
      for (const data of employees) {
        const { empid, name, salaryDetails } = data;
        const { ctc, effective_from, isOverwrite, remarks } = salaryDetails;
        const effectiveDate = new Date(effective_from);
        const newMonth = effectiveDate.getMonth(); // 0-based
        const newYear = effectiveDate.getFullYear();
 
        // Find or create the Employee record
        let employee = await Employee.findOne({ empid });
        if (!employee) {
          employee = new Employee({ empid, name });
          await employee.save();
          console.log(`New employee ${name} added.`);
        }

        // Get most recent salary record for this employee (if any)
        const lastSalaryRecord = await SalaryHistory.findOne({
          empid: employee.empid,
          $expr: {
            $and: [
              { $eq: [{ $month: "$effective_from" }, newMonth + 1] },
              { $eq: [{ $year: "$effective_from" }, newYear] }
            ]
          }
        });

        // Check if there's a record for the current effective period
        // if (lastSalaryRecord && 
        //     lastSalaryRecord.effective_from.getMonth() === newMonth &&
        //     lastSalaryRecord.effective_from.getFullYear() === newYear) {

          // Found a record for the same month-year period
          //if (lastSalaryRecord.ctc !== ctc) {
            if (!isOverwrite) {
              // isOverwrite true => insert new record for this period.
              const newSalaryEntry = new SalaryHistory({
                empid: employee.empid,
                ctc,
                effective_from: effectiveDate,
                isOverwrite: isOverwrite,
                remarks: remarks || "",
              });
              await newSalaryEntry.save();
              console.log(`Added new SalaryHistory record for ${name} for ${newMonth + 1}/${newYear} (overwrite mode).`);
            } else {
              // Update the existing record
              if (lastSalaryRecord && (lastSalaryRecord.effective_from.getMonth() === newMonth &&
                  lastSalaryRecord.effective_from.getFullYear() === newYear)) {
                lastSalaryRecord.ctc = ctc;
                lastSalaryRecord.effective_from = effectiveDate;
                lastSalaryRecord.remarks = remarks || "";
                await lastSalaryRecord.save();
                console.log(`Updated SalaryHistory record for ${name} for ${newMonth + 1}/${newYear}.`);
              } else {
                console.error("Error: lastSalaryRecord is null and cannot be updated.");
              }
            }
          // } else {
          //   console.log(`For ${name}, the salary for ${newMonth + 1}/${newYear} is already the same. No update needed.`);
          // }
        // } else {
        //   // Either no recent record exists or its month/year differ – insert a new record.
        //   const newSalaryEntry = new SalaryHistory({
        //     empid: employee.empid,
        //     ctc,
        //     effective_from: effectiveDate,
        //     isOverwrite: isOverwrite,
        //   });
        //   await newSalaryEntry.save();
        //   console.log(`Added new SalaryHistory record for ${name} for ${newMonth + 1}/${newYear}.`);
        // }
      }
    } catch (error) {
      console.error("Error updating/inserting salary details:", error);
    }
  }
  
  public async getEmployeeDetails() {
    const employeeData = await Employee.aggregate([
      {
        $lookup: {
          from: "salary_history",
          let: { empId: "$empid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ["$$empId", null] }, // Only match if empId is not null
                    { $eq: ["$empid", "$$empId"] }
                  ]
                }
              }
            },
            { $sort: { effective_from: -1 } },
            { $limit: 1 }
          ],
          as: "recentSalary"
        }
      },
      {
        $project: {
          empid: 1,
          name: 1,
          recentSalary: { $arrayElemAt: ["$recentSalary", 0] }
        }
      }
    ]);
    return employeeData;
  }

  public async getEmployeeDetailsByYear(year: number, employeeIdsResult: string[]) {
    const employeeData = await Employee.aggregate([
      {
        $match: {
          empid: { $in: employeeIdsResult }
        }
      },
      {
        $lookup: {
          from: "salary_history",
          let: { empId: "$empid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$employee", "$$empId"] },
                    {
                      $gte: ["$effective_from", new Date(`${year}-01-01T00:00:00.000Z`)]
                    },
                    {
                      $lt: ["$effective_from", new Date(`${year + 1}-01-01T00:00:00.000Z`)]
                    }
                  ]
                }
              }
            },
            { $sort: { effective_from: -1 } } // Optional: Get latest first
          ],
          as: "salary_history"
        }
      },
      {
        $project: {
          empid: 1,
          name: 1,
          salary_history: 1
        }
      }
    ]);
    

    return employeeData;
  }

//   public async getEmployeeDetailsByYear( year: number,empIds: string[]) {
//     console.log("test input for final result", year, empIds);
//     const fromDate = new Date(`${year}-01-01T00:00:00.000Z`);
//   console.log("fromDate", fromDate);
//     try {
//       const result = await SalaryHistory.aggregate([
//         {
//           $match: {
//             empid: { $in: empIds },
//             effective_from: { $gte: fromDate }
//           }
//         },
//         {
//           $lookup: {
//             from: "employee", // this should match your actual collection name
//             localField: "empid",
//             foreignField: "empid",
//             as: "employee_info"
//           }
//         },
//         {
//           $unwind: "$employee_info"
//         },
//         {
//           $project: {
//             _id: 0,
//             empid: 1,
//             name: "$employee_info.name",
//             ctc: 1,
//             effective_from: 1
//           }
//         }
//       ]);
  
//       console.log(" final result", result);
//       return result;
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
// }
}