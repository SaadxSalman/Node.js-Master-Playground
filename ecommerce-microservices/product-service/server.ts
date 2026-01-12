import express from 'express';
const app = express();

const products = [
    { id: '101', name: 'Mechanical Keyboard', price: 120 },
    { id: '102', name: 'Gaming Mouse', price: 50 }
];

app.get('/products', (req, res) => res.json(products));

app.listen(3002, () => console.log('📦 Product Service on port 3002'));