import { Document, Schema, model, models } from "mongoose";

interface IInsurancePolicy extends Document {
  farmer: string;
  contractAddress: string;
  premium: number;
  payout: number;
  startDate: number;
  endDate: number;
  temperatureThreshold: number;
  location: string;
  updateTemperature: boolean;
  approveMoney: boolean;
  isPayPremuim: boolean;
  isClaimed: boolean;
}

const insurancePolicySchema: Schema<IInsurancePolicy> =
  new Schema<IInsurancePolicy>({
    farmer: { type: String, ref: "User", required: true },
    contractAddress: { type: String, required: true },
    premium: { type: Number, required: true },
    payout: { type: Number, required: true },
    startDate: { type: Number, required: true },
    endDate: { type: Number, required: true },
    temperatureThreshold: { type: Number, required: true },
    location: { type: String, required: true },
    updateTemperature: { type: Boolean, default: false },
    approveMoney: { type: Boolean, default: false },
    isPayPremuim: { type: Boolean, default: false },
    isClaimed: { type: Boolean, default: false },
  });

export default models?.InsurancePolicy ||
  model<IInsurancePolicy>("InsurancePolicy", insurancePolicySchema);
