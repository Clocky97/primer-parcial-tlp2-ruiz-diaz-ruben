import { DataTypes } from "sequelize";
import { UserModel } from "../sequelize/user.model.js";

export const AssetModel = sequelize.define("Asset", {
  inventory_number: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  description: { type: DataTypes.STRING(500), allowNull: false },
  brand: { type: DataTypes.STRING(100), allowNull: false },
  model: { type: DataTypes.STRING(100), allowNull: false },
  status: {
    type: DataTypes.ENUM("good", "regular", "bad", "out_of_service"),
    allowNull: false,
    defaultValue: "good",
  },
  acquisition_date: { type: DataTypes.DATE, allowNull: false },
  acquisition_value: { type: DataTypes.DECIMAL, allowNull: false },
});

UserModel.hasMany(AssetModel, {
  foreignKey: "user_id",
  as: "asset",
  onDelete: "CASCADE",
});
AssetModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

