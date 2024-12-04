const { DataTypes } = require("sequelize");
const sequelize = require("../bd/conn");

const Mascotas = sequelize.define(
  "Mascota",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    especie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "mascotas",
    timestamps: false,
  }
);

module.exports = Mascotas