import express from 'express';
import cors from 'cors';
import ProductRoute from './routes/ProductRoute.js'
import OrderRoute from './routes/OrderRoute.js'
import FileUpload from 'express-fileupload';

const app = express()
const PORT = 5555

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); 
app.use(FileUpload());
app.use(ProductRoute);
app.use(OrderRoute);


app.listen(PORT, () => {
    console.log("Server running n good...")
})