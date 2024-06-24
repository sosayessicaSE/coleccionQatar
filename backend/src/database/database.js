import Sequelize from "sequelize";

export const sequelize = new Sequelize("figuritas", "root", "y.d.s.m03", {
  host: "localhost",
  dialect: "mysql",
});
