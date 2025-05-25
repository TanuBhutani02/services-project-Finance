import mongoose, { Schema } from "mongoose";

interface IOrgBilling extends Document {
    org_conversion_rate: number;
}

const OrgBillingSchema = new Schema({
    org_conversion_rate : { type: Number, required: true },
},{collection:'orgBilling'});

export const OrgBilling = mongoose.model<IOrgBilling>('OrgBilling', OrgBillingSchema);