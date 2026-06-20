import { Sequelize } from "sequelize";

const db_name = 'SiKasir_db_howevertip'
const username = 'SiKasir_db_howevertip'
const password = 'dacf30d611527059f3f4694530cc5a3b3b0cb40f'
const host = 'o5shb8.h.filess.io'
const port = '61002'
const dialect = 'mysql'


const db = new Sequelize(db_name, username, password, {
        host: host,
        dialect: dialect,
        port: port
})

export default db;