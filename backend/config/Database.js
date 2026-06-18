import { Sequelize } from "sequelize";

const db = new Sequelize('sikasir_db', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
})

export default db;