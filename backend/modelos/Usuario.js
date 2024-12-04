const { DataTypes } = require("sequelize");
const sequelize = require("../bd/conn");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombreCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nroIdentidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nroTelefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);
module.exports = Usuario