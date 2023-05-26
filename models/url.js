const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Url extends Model {}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    original_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "url",
  }
);

module.exports = Url;
