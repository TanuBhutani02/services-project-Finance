export function mapBiillingUIToBillingSchema(uiBillingData: any, empCTCDetail: any, accountcostfactor: any) {
    const { result, employeeBillingDetails } = calculateRevenueDetails(uiBillingData, empCTCDetail, accountcostfactor);

    return {
        project: uiBillingData.project,
        month: uiBillingData.month,
        year: uiBillingData.year,
        total_revenue: result.total_revenue || 0,
        total_revenue_gap: result.total_revenue_gap || 0,
        billing_Utilization: (result.total_actual_hours_billable / result.total_max_hours_billable) * 100 || 0,
        overall_Utilization: (result.total_actual_hours_billable / (result.total_max_hours_billable + result.total_max_hours_shadow)) * 100 || 0,
        total_max_hours_shadow: result.total_max_hours_shadow || 0,
        total_actual_hours_billable: result.total_actual_hours_billable || 0,
        total_cost_to_account: result.total_cost_to_account || 0,
        gross_Margin_Percent: ((result.total_revenue - result.total_cost_to_account) / result.total_revenue) * 100 || 0,
        gross_Margin: (result.total_revenue - result.total_cost_to_account) || 0,
        details: employeeBillingDetails
    }
}


function calculateRevenueDetails(uiBillingData: any, empCTCDetail: any, orgConversionRate: any) {

    
    // it is from ui or import from util
    // const maxHoursBillable = getTotalWorkingHours(uiBillingData.month, uiBillingData.year);
    const updatedDetails = uiBillingData.details.map((detail: any) => {
        // condition require for shadow resource
        const empLoyeeRevenue = +(detail.actualhoursbillable * detail.rate).toFixed(2);
        // need to revise
        const empCTC = (empCTCDetail.find((emp: any) => emp.empid == detail.empid))?.salary_history[0]?.ctc| 0;
        // const empCTC = (empCTCDetail.find((emp: any) => emp.empid == detail.empid)).salary_history.find((el: any)=>{
        //  return el.effective_from  === detail.month && el.effective_from === detail.year;   
        // }).ctc|| 0;
        // mutifactor=== billingfactor or divide by multiacountfactor
        const factoredMonthlyCost = +(((((empCTC) / 12) / detail?.maxhoursbillable) * detail.actualhoursbillable) / orgConversionRate).toFixed(2) || 0;
        // green fields := [actual_Billing_Hours, utilBillable, revenue, revenueGap,maxHousshadow,actulaHoursShadow,ctc,factoredMontlyCost]

        return {
            empid: detail.empid || null,
            name: detail.name || "",
            billling_status: detail.billingstatus || "",
            hrs_Per_Day: detail.hrsperday || 0,
            rate: detail.rate || 0,
            max_hours_billable: detail.maxhoursbillable || 0,
            actual_hours_billable: detail.actualhoursbillable || 0,
            util_billable: detail.actualhoursbillable / detail.maxhoursbillable || 0,
            revenue: empLoyeeRevenue || 0,
            revenue_gap: (detail.maxhoursbillable * detail.rate) - empLoyeeRevenue || 0,
            max_hours_shadow: detail.maxHoursShadow || 0,
            actual_hours_shadow: detail.actulaHoursShadow,
            multi_billing_account: detail.multibillingaccount || 0,
            account_cost_factor: +detail.accountcostfactor || 0,
            ctc: empCTC || 0,
            factored_monthly_cost: factoredMonthlyCost || 0,
            indMargin: (((empLoyeeRevenue - factoredMonthlyCost) / empLoyeeRevenue) * 100) || 0,
            status: detail.status || ""
        }
    }
    )

    const result = updatedDetails.reduce((acc: any, current: any) => {
        acc.total_revenue += current.revenue;
        acc.total_revenue_gap += current.revenue_gap;
        acc.billing_utilization += current.util_billable;
        acc.total_max_hours_shadow += current.max_hours_shadow,
        acc.total_actual_hours_billable += current.actual_hours_billable;
        acc.total_max_hours_billable += current.max_hours_billable;
        acc.total_cost_to_account += current.factored_monthly_cost;

        return acc;
    }, {
        total_revenue: 0,
        total_revenue_gap: 0,
        billing_utilization: 0,
        total_max_hours_billable: 0,
        total_actual_hours_billable: 0,
        total_cost_to_account: 0,
        total_max_hours_shadow: 0,
    });
    return { result: result, employeeBillingDetails: updatedDetails };
}