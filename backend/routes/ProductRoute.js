import express from 'express';
import {    getProducts,
            getProductsById,
            getProductsByJenis,
            createProduct,
            updateProduct,
            deleteProduct
} from '../controllers/ProductController.js';

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', getProductsById)
router.get('/products/jenis/:jenis', getProductsByJenis)
router.post('/products', createProduct)
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router;