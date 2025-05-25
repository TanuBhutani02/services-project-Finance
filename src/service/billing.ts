import { PipelineStage } from "mongoose";
import { Billing } from "../models/billing";
import { calculateBillingDetailsForSelectedTime, mapBiillingUIToBillingSchema, mapBillingSchemaToUI } from "../utils/mappingSchema";
import { EmployeeService } from "./employee";
import { OrgBillingService } from "./orgBilling";

export class BillingService{

    public async createBilling(data: any) {
        try {
       const billingData = mapBiillingUIToBillingSchema(data);
       const filter = { project: data.project, month: data.month, year: data.year};
       const options = { upsert: true, new: true };
        return await Billing.findOneAndUpdate(filter,billingData,options);
        } catch(error: any){
            throw new Error(`Error creating billing${error.message}`);
        }
    }

  
//       public async getBilling(filterData: { projects: any[]; year: number; month?: any }) {
     
//         try {
//           // Fetch organization conversion rate
//           const orgConversionRate = await new OrgBillingService().getOrgBilling();

//           // Example query using MongoDB aggregation pipeline
// const employeeIdsResult = await Billing.aggregate([
//   {
//     $match: {
//       project: { $in: filterData.projects } // replace with your array of projects from the UI
//     }
//   },
//   { $unwind: "$details" },
//   {
//     $group: {
//       _id: "$details.empid"  // groups by empid; used for a distinct list
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       empid: "$_id"
//     }
//   }
// ]);
// console.log("test project structure for billing data ###### employeeIdsResult tanu", employeeIdsResult.length);

// const employeeIds = employeeIdsResult
//   .filter(item => item.empid !== null && item.empid !== undefined)
//   .map(item => item.empid);

    
//           // Fetch employee details with salary history for the selected year.
//           const employeeData = await new EmployeeService().getEmployeeDetailsByYear(filterData.year, employeeIds);
    
//           // Build query for Billing documents
//           const query: { project: { $in: any[] }; year: number; month?: number } = {
//             project: { $in: filterData.projects },
//             year: filterData.year,
//           };
    
//           // Only add month filter if filterData.month is provided and non-empty
//           if (filterData.month !== undefined && filterData.month !== "") {
//             query.month = +filterData.month;
//           }
    
//           // Fetch billing data based on the query
//           let data: any = await Billing.find(query);

    
//           // Map billing schema data to UI format using employee and org conversion rate data
//           data = mapBillingSchemaToUI(data, employeeData, orgConversionRate);
//           return data;
//         } catch (error: any) {
//           throw new Error(`Error getting billing: ${error.message}`);
//         }
//       }
    

// public async getBilling(filterData: { projects: any[]; year: number; month?: any }){
//   // Replace YEAR, MONTH (optional), and PROJECT_IDS dynamically in your Node.js code before executing

// const pipeline = [
//   {
//     $match: {
//       project: { $in: filterData.projects },
//       year: filterData.year,
//       ...(typeof filterData.month !== 'undefined' ? { month: filterData.month } : {})
//     }
//   },
//   { $unwind: "$details" },
//   {
//     $lookup: {
//       from: "salary_history",
//       let: { empid: "$details.empid" },
//       pipeline: [
//         {
//           $match: {
//             $expr: {
//               $eq: ["$empid", "$$empid"]
//             }
//           }
//         },
//         {
//           $addFields: {
//             effectiveYear: { $year: "$effective_from" }
//           }
//         },
//         {
//           $match: {
//             $expr: {
//               $lte: ["$effectiveYear", filterData.year]
//             }
//           }
//         },
//         {
//           $sort: {
//             effective_from: -1
//           }
//         },
//         {
//           $group: {
//             _id: "$empid",
//             salary_history: {
//               $push: {
//                 ctc: "$ctc",
//                 effective_from: "$effective_from"
//               }
//             }
//           }
//         }
//       ],
//       as: "salary_info"
//     }
//   },
//   {
//     $lookup: {
//       from: "employee",
//       localField: "details.empid",
//       foreignField: "empid",
//       as: "emp"
//     }
//   },
//   {
//     $unwind: { path: "$emp", preserveNullAndEmptyArrays: true }
//   },
//   {
//     $addFields: {
//       "details.name": "$emp.name",
//       "details.salary_history": {
//         $ifNull: [
//           { $arrayElemAt: ["$salary_info.salary_history", 0] },
//           []
//         ]
//       }
//     }
//   },
//   {
//     $group: {
//       _id: "$project",
//       employeeBillingDetails: { $push: "$details" }
//     }
//   },
//   {
//     $project: {
//       project: "$_id",
//       employeeBillingDetails: 1,
//       _id: 0
//     }
//   },
//   {
//     $addFields: {
//       billingYear: filterData.year,
//       ...(typeof filterData.month !== 'undefined' ? { billingMonth: filterData } : {})
//     }
//   }
// ];

// }

async  getBilling(filterData: { projects: any[]; year: number; month?: any }) {
 // Replace YEAR, MONTH (optional), and PROJECT_IDS dynamically in your Node.js code before executing

// Replace YEAR, MONTH (optional), and PROJECT_IDS dynamically in your Node.js code before executing
  console.log("test input for final result ############", filterData.year, +filterData.month, filterData.projects);
// Replace YEAR, MONTH (optional), and PROJECT_IDS dynamically in your Node.js code before executing

const pipeline: any = [
  {
    $match: {
      project: { $in: filterData.projects },
      // year: filterData.year,
      // ...(typeof filterData.month !== 'undefined' ? { month: filterData.month } : {})
    }
  },
  { $unwind: "$details" },
  {
    $lookup: {
      from: "salary_history",
      let: { empid: "$details.empid", selectedYear: +filterData.year, selectedMonth: +filterData.month },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$empid", "$$empid"] }
          }
        },
        {
          $addFields: {
            effectiveYear: { $year: "$effective_from" },
            effectiveMonth: { $month: "$effective_from" }
          }
        },
        { $sort: { effective_from: -1 } },
        {
          $group: {
            _id: null,
            all: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            salary_history: {
              $cond: [
                { $ifNull: ["$$selectedMonth", false] },
                {
                  $filter: {
                    input: "$all",
                    as: "item",
                    cond: {
                      $and: [
                        { $eq: ["$$item.effectiveYear", "$$selectedYear"] },
                        { $eq: ["$$item.effectiveMonth", "$$selectedMonth"] }
                      ]
                    }
                  }
                },
                {
                  $cond: [
                    {
                      $gt: [
                        {
                          $size: {
                            $filter: {
                              input: "$all",
                              as: "item",
                              cond: { $eq: ["$$item.effectiveYear", "$$selectedYear"] }
                            }
                          }
                        },
                        0
                      ]
                    },
                    {
                      $filter: {
                        input: "$all",
                        as: "item",
                        cond: { $eq: ["$$item.effectiveYear", "$$selectedYear"] }
                      }
                    },
                    {
                      $let: {
                        vars: {
                          pastYears: {
                            $filter: {
                              input: "$all",
                              as: "item",
                              cond: { $lt: ["$$item.effectiveYear", "$$selectedYear"] }
                            }
                          }
                        },
                        in: {
                          $cond: [
                            { $gt: [{ $size: "$$pastYears" }, 0] },
                            {
                              $filter: {
                                input: "$$pastYears",
                                as: "item",
                                cond: {
                                  $eq: ["$$item.effectiveYear", {
                                    $max: "$$pastYears.effectiveYear"
                                  }]
                                }
                              }
                            },
                            []
                          ]
                        }
                      }
                    }
                  ]
                }
              ]
            }
          }
        }
      ],
      as: "salary_info"
    }
  },
  {
    $lookup: {
      from: "employee",
      localField: "details.empid",
      foreignField: "empid",
      as: "emp"
    }
  },
  {
    $unwind: { path: "$emp", preserveNullAndEmptyArrays: true }
  },
  {
    $addFields: {
      "details.name": "$emp.name",
      "details.salary_history": {
        $ifNull: [
          { $arrayElemAt: ["$salary_info.salary_history", 0] },
          []
        ]
      }
    }
  },
  {
    $group: {
      _id: { project: "$project", empid: "$details.empid" },
      employeeName: { $first: "$details.name" },
      salaryHistory: { $first: "$details.salary_history" },
      billingDetails: { $push: {
        month: "$month",
        billing_status: "$details.billing_status",
        hrs_Per_Day: "$details.hrs_Per_Day",
        rate: "$details.rate",
        max_hours_billable: "$details.max_hours_billable",
        actual_hours_billable: "$details.actual_hours_billable",
        max_hours_shadow: "$details.max_hours_shadow",
        actual_hours_shadow: "$details.actual_hours_shadow",
        multi_billing_account: "$details.multi_billing_account",
        account_cost_factor: "$details.account_cost_factor",
        status: "$details.status"
      }}
    }
  },
  {
    $group: {
      _id: "$_id.project",
      employeeDetails: {
        $push: {
          name: "$employeeName",
          empid: "$_id.empid",
          salaryHistory: "$salaryHistory",
          billingDetails: "$billingDetails"
        }
      }
    }
  },
  {
    $project: {
      project: "$_id",
      employeeDetails: 1,
      _id: 0
    }
  },
  {
    $addFields: {
      billingYear: +filterData.year,
      billingMonth: +filterData.month || null
    }
  },
  {
    $group: {
      _id: null,
      billingYear: { $first: "$billingYear" },
      billingMonth: { $first: "$billingMonth" },
      details: { $push: { project: "$project", employeeDetails: "$employeeDetails" } }
    }
  },
  {
    $project: {
      _id: 0,
      billingYear: 1,
      billingMonth: 1,
      details: 1
    }
  }
];



 
  const result = await Billing.aggregate(pipeline);
  const orgConversionRate = await new OrgBillingService().getOrgBilling();
  //return calculateMetrics()
  return calculateBillingDetailsForSelectedTime(result[0], orgConversionRate);
  //return result[0]; // Only one document is returned
}
}