import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Order_items = db.define('Order_items', {
    order_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    harga: DataTypes.DECIMAL
}, {
    freezeTableName: true
})

export default Order_items;

(async () => {
    await db.sync()
})();