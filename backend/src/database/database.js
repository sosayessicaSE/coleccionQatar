import Sequelize from "sequelize";

export const sequelize = new Sequelize("figuritas", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
