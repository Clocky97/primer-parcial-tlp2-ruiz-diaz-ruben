import { Schema, model } from "mongoose";

const AssetSchema = new Schema(
  {
    inventoryNumber: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    brand: { type: String, required: true, minlength: 2, maxlength: 100 },
    model: { type: String, required: true, minlength: 2, maxlength: 100 },
    status: {
      type: String,
      enum: ["good", "regular", "bad", "out_of_service"],
      default: "good",
    },
    acquisitionDate: { type: Date, required: true },
    acquisitionValue: { type: Number, required: true, min: 0 },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    deleted: { type: Boolean, default: false}
  },
  { timestamps: true }
);

export const AssetModel = model("Asset", AssetSchema);
