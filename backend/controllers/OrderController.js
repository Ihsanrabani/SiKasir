import { Orders, Order_items } from "../models/Relations.js";

export const getOrders = async(req, res) => {
    try {
        const response = await Orders.findAll({
            include: [Order_items]
        });

        res.status(200).json(response);

    } catch (error) {
        console.log(error.message)
    }
}

export const createOrder = async(req, res) => {
    try {
        const { table_number, orderItems } = req.body;
        const order_code = Math.random().toString(36).substring(2, 9);


        // INSERT DATA ORDER KE DB
        const order = await Orders.create({
            order_code: order_code,
            table_num: table_number
        })
        console.log(orderItems)

        // INSERT DATA ORDER ITEMS KE DB
        for (const item of orderItems) {
            await Order_items.create({
                order_id: order.id,
                nama: item.nama,
                qty: item.qty,
                harga: item.harga
            })
        }


        res.status(201).json({
            message: "Order berhasil dibuat"
        });

    } catch (error) {
          res.status(500).json({
            message: error.message
        });
    }

}

export const deleteOrder = async(req, res) => {
    try {
        await Orders.destroy({
            where: {
                id: req.params.id
            }
        })

        await Order_items.destroy({
            where: {
                order_id: req.params.id
            }
        })

        res.status(200).json({msg: "Order Berhasil Dihapus"})
    } catch (error) {
        console.log(error)
    }
}