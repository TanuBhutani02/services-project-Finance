import { project } from "../config/controllers/project";

export function mapBiillingUIToBillingSchema(uiBillingData: any,) {
    const updatedDetails =   uiBillingData.details.map((detail: any) => {
        // condition require for shadow resource
        //const empLoyeeRevenue = +(detail.actualhoursbillable * detail.rate).toFixed(2);
        // need to revise
       // const empCTC = (empCTCDetail.find((emp: any) => emp.empid == detail.empid))?.salary_history[0]?.ctc| 0;
        // const empCTC = (empCTCDetail.find((emp: any) => emp.empid == detail.empid)).salary_history.find((el: any)=>{
        //  return el.effective_from  === detail.month && el.effective_from === detail.year;   
        // }).ctc|| 0;
        // mutifactor=== billingfactor or divide by multiacountfactor
       // const factoredMonthlyCost = +(((((empCTC) / 12) / detail?.maxhoursbillable) * detail.actualhoursbillable) / totalConversionRate).toFixed(2) || 0;
        // green fields := [actual_Billing_Hours, utilBillable, revenue, revenueGap,maxHousshadow,actulaHoursShadow,ctc,factoredMontlyCost]

        return {
            empid: detail.empid || null,
            name: detail.name || "",
            billing_status: detail.billingstatus || "",
            hrs_Per_Day: detail.hrsperday || 0,
            rate: detail.rate || 0,
            max_hours_billable: detail.maxhoursbillable || 0,
            actual_hours_billable: detail.actualhoursbillable || 0,
           // util_billable: detail.actualhoursbillable / detail.maxhoursbillable || 0,
           // revenue: empLoyeeRevenue || 0,
           // revenue_gap: (detail.maxhoursbillable * detail.rate) - empLoyeeRevenue || 0,
            max_hours_shadow: detail.maxHoursShadow || 0,
            actual_hours_shadow: detail.actualHoursShadow,
            multi_billing_account: detail.multibillingaccount || 0,
            account_cost_factor: detail.accountcostfactor || 0,
           // ctc: empCTC || 0,
           // factored_monthly_cost: factoredMonthlyCost || 0,
            //: (((empLoyeeRevenue - factoredMonthlyCost) / empLoyeeRevenue) * 100) || 0,
            status: detail.status || ""
        }
    }
    )

    return({
        project: uiBillingData.project,
        month: uiBillingData.month,
        year: uiBillingData.year,
        details: updatedDetails,
    })
}


export function mapBillingSchemaToUI(uiBillingData: any,empCTCDetail: any, accountcostfactor: any) {
   
        // green fields := [actual_Billing_Hours, utilBillable, revenue, revenueGap,maxHousshadow,actulaHoursShadow,ctc,factoredMontlyCost]
     //const { result, employeeBillingDetails } = calculateRevenueDetails(uiBillingData, empCTCDetail, accountcostfactor);

    // return {
    //     project: uiBillingData.project,
    //     month: uiBillingData.month,
    //     year: uiBillingData.year,
    //     total_revenue: result.total_revenue || 0,
    //     total_revenue_gap: result.total_revenue_gap || 0,
    //     billing_Utilization: (result.total_actual_hours_billable / result.total_max_hours_billable) * 100 || 0,
    //     overall_Utilization: (result.total_actual_hours_billable / (result.total_max_hours_billable + result.total_max_hours_shadow)) * 100 || 0,
    //     total_max_hours_shadow: result.total_max_hours_shadow || 0,
    //     total_actual_hours_billable: result.total_actual_hours_billable || 0,
    //     total_cost_to_account: result.total_cost_to_account || 0,
    //     gross_Margin_Percent: ((result.total_revenue - result.total_cost_to_account) / result.total_revenue) * 100 || 0,
    //     gross_Margin: (result.total_revenue - result.total_cost_to_account) || 0,
    //     details: employeeBillingDetails
    // }
}

function getEmpCTCForBilling(empCTCDetail: any[], empid: string, billingYear: number, billingMonth: number): number {

    const empRecord = empCTCDetail.find(emp => emp.empid === empid);
    if (!empRecord || !empRecord.salary_history || empRecord.salary_history.length === 0) return 0;
    
    // Look for an exact match
    let foundRecord = empRecord.salary_history.find((rec: any) => {
      const date = new Date(rec.effective_from);
      return date.getFullYear() === billingYear && (date.getMonth() + 1) === billingMonth;
    });
    // If not found, iterate backwards within the same year.
    let currentMonth = billingMonth - 1;
    while (!foundRecord && currentMonth > 0) {
      foundRecord = empRecord.salary_history.find((rec: any) => {
        const date = new Date(rec.effective_from);
        return date.getFullYear() === billingYear && (date.getMonth() + 1) === currentMonth;
      });
      currentMonth--;
    }
    return foundRecord ? foundRecord.ctc : 0;
  }

  export function calculateBillingDetailsForSelectedTime(result: any, totalConversionRate = 1) {
    if (!result?.details || !Array.isArray(result.details)) {
      return result;
    }
    for (const projectBlock of result.details) {
      for (const emp of projectBlock.employeeDetails) {
        for (const detail of emp.billingDetails) {
          const billingMonth = parseInt(detail.month);
  
          // Try to find matching CTC for the billing month
          let matchingCTCEntry = emp.salaryHistory.find(
            (s: any) => s.effectiveMonth === billingMonth && s.effectiveYear === result.billingYear
          );
  
          // If not found, pick the latest available salary from salary history
          if (!matchingCTCEntry && emp.salaryHistory.length > 0) {
            // Sort salaryHistory by effective date descending
            const sortedHistory = emp.salaryHistory.sort((a: any, b: any) =>
              new Date(b.effective_from).getTime() - new Date(a.effective_from).getTime()
            );
            matchingCTCEntry = sortedHistory[0];
          }
  
          const empCTC = matchingCTCEntry?.ctc || 0;

         const factoredMonthlyCost = +(((((empCTC) / 12) / detail.max_hours_billable) * detail.actual_hours_billable) / 81.5) || 0;    
         detail.factored_monthly_cost = factoredMonthlyCost;
         //  detail.util_billable =  +(detail.actual_hours_billable / detail.max_hours_billable) || 0;
         //  detail.revenue =  +((detail.actual_hours_billable * detail.rate));
           //detail.revenue_gap=  +(detail.max_hours_billable * detail.rate) - detail.revenue || 0;
           


           // revenue: empLoyeeRevenue || 0,
           // revenue_gap: (detail.maxhoursbillable * detail.rate) - empLoyeeRevenue || 0,
        }
      }
    }

   return calculateMetrics(result);
    //return result;
  }
  
  

  function calculateMetrics(input: any) {
   
  
    const projects: any = [];

    const employeeBillingDetailsForSelectedTime = [];
    const total = {
      revenue: 0,
      billing_utilization: 0,
      overall_utilzation:0,
      cost_to_account: 0,
      gross_margin: 0,
      gross_margin_percent: 0,
      actual_hours_billable: 0,
      max_hours_billable: 0,
      max_hours_shadow: 0,
    };
    console.log("trace input for billing details input", input);
    for (const detail of input.details) {
   
      const projectMetrics = {
        overall_utilzation: 0,
        max_hours_billable:0,
        actual_hours_billable: 0,
        billing_utilization: 0,
        revenue: 0,
        revenue_gap: 0,
         max_hours_shadow: 0,
        actual_hours_shadow: 0,
       factored_monthly_cost: 0,
        total_max_hours_shadow: 0,
        individual_margin: 0,
        gross_margin_percent: 0,
        gross_margin: 0,
        cost_to_account: 0,
        project: '',
      };
      for (const t of detail?.employeeDetails) {
        
        const employeeMetrics={
          empid: '',
          name: '',
          billing_status: null,
          hrs_Per_Day: 0,
          rate: 0,
          max_hours_billable: 0,
          actual_hours_billable: 0,
          util_billable: 0,
          revenue: 0,
          revenue_gap: 0,
          max_hours_shadow: 0,
          actual_hours_shadow: 0,
          multi_billing_account: 0,
          account_cost_factor: 0,
          ctc: 0,
          factored_monthly_cost: 0,
          billing_utilization:0,
          project:'',
        }
         employeeMetrics.empid = t?.empid || '';
         employeeMetrics.name = t?.name || '';
         employeeMetrics.hrs_Per_Day = t?.hrs_Per_Day || 0;
         employeeMetrics.billing_status = t?.billing_status || null;
         for(const emp of t?.billingDetails){
         
        const rate = parseFloat(emp.rate) || 0;
        const max_billable = parseFloat(emp.max_hours_billable) || 0;
        const actual_billable = parseFloat(emp.actual_hours_billable) || 0;
        const cost_factor = parseFloat(emp.account_cost_factor) || 0;
    
        const revenue = actual_billable * rate;
        const cost = actual_billable * cost_factor;
        const revenue_gap = (max_billable - actual_billable) * rate;
          
         employeeMetrics.project = detail.project,
         employeeMetrics.actual_hours_billable += parseFloat(emp.actual_hours_billable);
         employeeMetrics.max_hours_billable += parseFloat(emp.max_hours_billable);
        
        employeeMetrics.revenue += revenue;
        employeeMetrics.revenue_gap += revenue_gap;
        employeeMetrics.max_hours_shadow += parseFloat(emp.max_hours_shadow) ;
        employeeMetrics.factored_monthly_cost +=  emp.factored_monthly_cost;
     
      }
      employeeBillingDetailsForSelectedTime.push(employeeMetrics);
      // Project-level billing utilization
      // projectMetrics.billing_utilization =
      //   projectMetrics.total_max_hours_billable > 0
      //     ? (projectMetrics.total_actual_hours_billable / projectMetrics.total_max_hours_billable) * 100
      //     : 0;
  
      // Aggregate into total    
    }
    console.log("trace project metrics before 2", projectMetrics)

    employeeBillingDetailsForSelectedTime.forEach((project: any)=> {
     //  console.log("trace project metrics between", projectMetrics);
    const id = projects?.findIndex((p: any) => p.project === project.project);
      if(id === -1){ 
    projectMetrics.revenue += project.revenue;
      projectMetrics.revenue_gap += project.revenue_gap;  
      projectMetrics.billing_utilization += project.billing_utilization;
     projectMetrics.actual_hours_billable += project.actual_hours_billable;
     projectMetrics.max_hours_billable += project.max_hours_billable;
     projectMetrics.factored_monthly_cost += project.factored_monthly_cost;
     projectMetrics.project = detail.project;
      }
    })
    //console.log("trace project metrics push", projectMetrics)
    projectMetrics.gross_margin_percent= ((projectMetrics.revenue - projectMetrics.factored_monthly_cost) / projectMetrics.revenue) * 100 || 0;
    projectMetrics.gross_margin= (projectMetrics.revenue - projectMetrics.factored_monthly_cost) || 0;
    projectMetrics.billing_utilization =  projectMetrics.max_hours_billable > 0
    ? (projectMetrics.actual_hours_billable / projectMetrics.max_hours_billable) * 100
    : 0;
    projectMetrics.overall_utilzation = (projectMetrics.actual_hours_billable/ (projectMetrics.max_hours_billable + projectMetrics.max_hours_shadow)) * 100;
    projects.push(projectMetrics);
         
    }
    
for(const projectDetails of projects) {
  total.revenue +=projectDetails.revenue;
  total.actual_hours_billable += projectDetails.actual_hours_billable;
  total.max_hours_billable += projectDetails.max_hours_billable;
 
  total.cost_to_account += projectDetails.factored_monthly_cost;
 
   total.max_hours_shadow += projectDetails.max_hours_shadow;
    // Final total-level billing utilization
}
total.gross_margin_percent= ((total.revenue - total.cost_to_account) / total.revenue) * 100 || 0;
total.gross_margin= (total.revenue - total.cost_to_account) || 0;
total.billing_utilization =  total.max_hours_billable > 0
? (total.actual_hours_billable / total.max_hours_billable) * 100
 : 0;
 total.overall_utilzation += (total.actual_hours_billable/ (total.max_hours_billable + total.max_hours_shadow)) * 100;

    return { total, projects, employeeBillingDetailsForSelectedTime };
  }
  