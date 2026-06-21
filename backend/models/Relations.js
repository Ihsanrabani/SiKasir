import Orders from "./OrdersModel.js";
import Order_items from "./Order-itemsModel.js";

Orders.hasMany(Order_items, {
    foreignKey: "order_id"
})

Order_items.belongsTo(Orders, {
    foreignKey: "order_id"
})

export {Orders, Order_items}