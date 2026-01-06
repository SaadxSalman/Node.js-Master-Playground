const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ products: ["Laptop", "Mouse", "Keyboard"] }));
app.listen(5000, () => console.log("Product Service on 5000"));