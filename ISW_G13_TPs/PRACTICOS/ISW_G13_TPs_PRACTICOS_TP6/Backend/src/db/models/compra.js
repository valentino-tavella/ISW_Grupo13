import { DataTypes } from "sequelize";
import sequelize from "../conexion.js";

const Compra = sequelize.define(
  "Compra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_compra: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    mail_comprador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo_pago: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "Compra",
    timestamps: true,
  }
);

export default Compra;
