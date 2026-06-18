import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Orders = db.define('orders', {
    order_code: DataTypes.STRING,
    table_num: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Orders;

(async () => {
    await db.sync()
})();