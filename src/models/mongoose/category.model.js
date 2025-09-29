import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
    deleted: { type: Boolean, default: false}
  },
  { timestamps: true }
);



export const CategoryModel = model("Category", CategorySchema);
