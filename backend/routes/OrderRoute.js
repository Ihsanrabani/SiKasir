import express from 'express';
import { getOrders ,createOrder, deleteOrder } from '../controllers/OrderController.js';

const router = express.Router()

router.get('/order', getOrders)
router.post('/order', createOrder)
router.delete('/order/:id', deleteOrder)

export default router;