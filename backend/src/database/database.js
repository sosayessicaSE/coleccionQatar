import Sequelize from "sequelize";

export const sequelize = new Sequelize("figuritas", "", "", {
  host: "localhost",
  dialect: "mysql",
});
