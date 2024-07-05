import { Document, Schema, model, models } from "mongoose";

interface IUser extends Document {
  address: string;
  role: "admin" | "farmer";
  isAdmin(): boolean;
  isFarmer(): boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  address: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ["admin", "farmer"], required: true },
});

// verify that user is Admin or not
userSchema.method("isAdmin", function () {
  return this.role === "admin";
});

// verify that user is Admin or not
userSchema.method("isFarmer", function () {
  return this.role === "farmer";
});

export default models?.User || model<IUser>("User", userSchema);
