const express = require('express');

const routes = require('./routes/items.route')

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use("/items", routes.router);

const port  = process.env.NODEJS_PORT || 8080

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
})