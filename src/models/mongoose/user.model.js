import { model, Schema } from "mongoose";
import { AssetModel } from "./asset.model.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    profile: {
      employee_number: { type: String, unique: true, required: true },
      firstname: {
        type: String,
        unique: true,
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      lastname: {
        type: String,
        unique: true,
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      phone: { type: String, required: false },
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

//cascada

UserSchema.pre("findByIdAndUpdate", async function (next) {
  const user = await this.model.findOne(this.getFilter());
  if (user) {
    await AssetModel.updateMany({ owner: user._id }, { deleted: true });
  }
  next();
});

export const UserModel = model("User", UserSchema);
