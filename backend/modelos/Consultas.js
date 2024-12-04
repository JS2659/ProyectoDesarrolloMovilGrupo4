const { DataTypes } = require("sequelize");
const sequelize = require("../bd/conn");

const Consultas = sequelize.define(
  "Consulta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idMascota: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "consultas",
    timestamps: false,
  }
);

module.exports = Consultas;
