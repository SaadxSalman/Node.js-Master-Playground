import express from 'express';
const app = express();

const PRODUCTS = [
    { id: "p1", name: "Laptop", price: 1000 },
    { id: "p2", name: "Mouse", price: 50 }
];

app.get('/products', (req, res) => res.json(PRODUCTS));

app.get('/products/:id', (req, res) => {
    const product = PRODUCTS.find(p => p.id === req.params.id);
    product ? res.json(product) : res.status(404).send("Not found");
});

app.listen(5002, () => console.log("Product Service on 5002"));