const { DataTypes } = require("sequelize");
const sequelize = require("../bd/conn");

const Recordatorios = sequelize.define(
  "Recordatorio",
  {
    idRecordatorio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idMascota: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaLimite: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "recordatorios",
    timestamps: false,
  }
);

module.exports = Recordatorios