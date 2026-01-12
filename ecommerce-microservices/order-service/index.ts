import express from 'express';
import axios from 'axios';
const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
    const { productId, userId } = req.body;
    // Inter-service call: Check if product exists
    const productResponse = await axios.get(`http://localhost:3002/products`);
    const product = productResponse.data.find((p: any) => p.id === productId);

    if (!product) return res.status(404).send("Product unavailable");

    res.json({ orderId: "ORD-" + Math.random().toString(36).substr(2, 9), status: "Success", product });
});

app.listen(3003, () => console.log("Order Service on :3003"));