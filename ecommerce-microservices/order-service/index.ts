import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const ORDERS: any[] = [];

app.post('/orders', async (req, res) => {
    const { productId, userId } = req.body;
    try {
        // Communication: Order -> Product Service
        const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}`);
        const product = response.data;

        const newOrder = { id: Date.now(), product, userId, date: new Date() };
        ORDERS.push(newOrder);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: "Product not found or service down" });
    }
});

app.listen(5003, () => console.log("Order Service on 5003"));