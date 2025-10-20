import { DataTypes } from "sequelize";
import sequelize from "../conexion.js";

const Entrada = sequelize.define(
  "Entrada",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_compra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad_visitante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha_visita: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
    {
    tableName: "Entrada",
    timestamps: true,
  }
);


export default Entrada;