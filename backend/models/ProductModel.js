import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('product', {
    nama: DataTypes.STRING,
    jenis: DataTypes.STRING,
    harga: DataTypes.DECIMAL,
    image: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Product;

(async () => {
    await db.sync()
})();