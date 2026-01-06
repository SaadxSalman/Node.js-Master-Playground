const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ status: "Auth Service Active", user: "Admin" }));
app.listen(4000, () => console.log("Auth Service on 4000"));