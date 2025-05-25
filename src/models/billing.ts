import mongoose, { Schema, Document } from 'mongoose';

interface IDetail extends Document {
  empid: string;
  name: string;
  billing_status: string;
  hrs_Per_Day: Number;
  rate: number;
  max_hours_billable : number;
  actual_hours_billable: number;
  util_Billable: number;
  revenue: number;
  revenue_gap: number;
  max_hours_shadow: number;
  actual_hours_shadow : number;
  multi_billing_account: number;
  account_cost_factor: string;
  ctc: number;
  factored_monthly_cost: number;
  indMargin: number;
  status: string;
}
// green fields := [actual_Billing_Hours, utilBillable,
//  revenue, revenueGap,maxHousshadow,actulaHoursShadow,
// ctc,factoredMontlyCost]

interface IBilling extends Document {
  project: string,
  month: String,
  year: String,
  total_revenue : Number,
  total_revenue_gap: Number,
  billing_Utilization : Number,
  overall_Utilization: Number,
  total_max_hours_shadow :Number,
  total_actual_hours_billable:Number,
  total_cost_to_account : Number,
  gross_Margin_Percent:  Number,
  gross_Margin: Number,
  details: [IDetail],
}

const DetailSchema: Schema = new Schema({
  empid: {type: String},
  name: {type: String},
  billing_status: {type: String},
  hrs_Per_Day: {type: Number},
  rate: {type: Number},
  max_hours_billable : {type: Number},
  actual_hours_billable: {type: Number},
  util_Billable: {type: Number},
  revenue: {type: Number},
  revenue_gap: {type: Number},
  max_hours_shadow: {type: Number},
  actual_hours_shadow : {type: Number},
  multi_billing_account: {type: Number},
  account_cost_factor: {type: Number},
  ctc: {type: Number},
  factored_monthly_cost: {type: Number},
  indMargin: {type: Number},
  status: {type: String},
});

const BillingInput: Schema = new Schema({
  empid: {type: String},
  name: {type: String},
  billing_status: {type: String},
  hrs_Per_Day: {type: Number},
  rate: {type: Number},
  max_hours_billable : {type: Number},
  actual_hours_billable: {type: Number},
  max_hours_shadow: {type: Number},
  actual_hours_shadow : {type: Number},
  multi_billing_account: {type: Number},
  account_cost_factor: {type: Number},
  status: {type: String},
})

const BillingSchema: Schema = new Schema({
  project: { type: String },
  month: { type: String   },
  year: { type: String },
  // total_revenue : {type: Number},
  // total_revenue_gap: {type : Number},
  // billing_Utilization : {type: Number},
  // overall_Utilization: {type: Number},
  // total_max_hours_shadow :{type:Number},
  // total_actual_hours_billable:{type:Number},
  // total_cost_to_account : {type: Number},
  // gross_Margin_Percent:  {type: Number},
 // gross_Margin: {type: Number},
  details: [BillingInput],
},{collection:'billing'});

BillingSchema.index({project:1, month: 1, year: 1 }, { unique: true });

export const Billing = mongoose.model<IBilling>('Billing', BillingSchema);