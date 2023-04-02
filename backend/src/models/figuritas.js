import { DataTypes } from "sequelize"
import { sequelize } from "../database/database.js"

export const Figurita = sequelize.define("figuritas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    pais: {
        type: DataTypes.STRING
    },
    numero: {
        type: DataTypes.INTEGER
    },
    tengo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    imagen: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false  // Evita la creación automática de las columnas createdAt y updatedAt
});
