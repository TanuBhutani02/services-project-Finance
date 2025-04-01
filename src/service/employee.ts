import { Employee } from "../models/employee";
import { camelToSnakeCaseKeys } from "../utils/helper";

export class EmployeeService {

  public async storeEmployeeData(employeeData:any) {
    console.log(employeeData);
    try {
      for (const data of employeeData) {
        const { empid, name, salaryDetails } = data;
        const { ctc, effective_from } = salaryDetails;
        const effectiveDate = new Date(effective_from);
  
        const employee = await Employee.findOne({ empid });
  
        if (!employee) {
          // Create new employee record
          const newEmployee = new Employee({
            empid,
            name,
            salary_history: [{ ctc, effective_from: effectiveDate }],
          });
          await newEmployee.save();
          console.log(`New employee ${name} added with salary details.`);
          continue;
        }
  
        // Check if effective_from exists in salary_history
        const existingIndex = employee.salary_history.findIndex(
          (entry) => entry.effective_from.getTime() === effectiveDate.getTime()
        );
  
        if (existingIndex !== -1) {
          // Overwrite CTC if the date exists
          employee.salary_history[existingIndex].ctc = ctc;
          console.log(`Updated CTC for ${name} on ${effective_from}`);
        } else {
          // Push a new salary entry if the date is new
          employee.salary_history.push({ ctc, effective_from: effectiveDate });
          console.log(`Added new salary entry for ${name}`);
        }
  
        await employee.save();
      }
    } catch (error) {
      console.error("Error updating/inserting salary details:", error);
    }
  };


  // public async storeEmployeeData(
  //  data : any
  // ) {
  //   const { ctc, effective_from } = data.salaryDetails;
  //    const {empid , name} = data;
  //   await Employee.findOneAndUpdate(
  //     { empid, "salary_history.effective_from": effective_from }, // Check if the date exists
  //     { $set: { "salary_history.$.ctc": ctc } }, // Update existing entry
  //     { upsert: false, new: true }
  //   ).then(async (result) => {
  //     if (!result) {
  //       // If no matching date found, push a new entry
  //       await Employee.findOneAndUpdate(
  //         { empid },
  //         { $push: { salary_history: data.salaryDetails } },
  //         { upsert: false, new: true }
  //       );
  //     }
  //   });
  // }
  //  public async storeEmployeeData(employeeList: any){ 
  //     await Employee.deleteMany({});
  //       await Employee.insertMany(employeeList);
  //  }

   public async getEmployeeDetails(){
     return await Employee.find().lean();
   }
}