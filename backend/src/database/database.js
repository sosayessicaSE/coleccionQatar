import Sequelize from 'sequelize'

export const sequelize = new Sequelize ('figuritas', 'postgres', 'venus',{
    host: 'localhost',
    dialect: 'postgres'


})