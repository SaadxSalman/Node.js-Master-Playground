import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Proxy Logic
app.use('/auth', async (req, res) => {
    const result = await axios.post('http://localhost:3001/login', req.body);
    res.json(result.data);
});

app.get('/store/products', async (req, res) => {
    const result = await axios.get('http://localhost:3002/products');
    res.json(result.data);
});

app.listen(3000, () => console.log("API Gateway running on :3000"));