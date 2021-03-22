const express = require('express');
const router = express.Router();
// In memory Storage
const items = [];

router.get('/', function(req, res) {
  res.status(200).send(items);
});

router.post('/', function(req, res) {
    const item = req.body;
    if (item) {
        items.push(item);
        res.status(201).send();
    } else {
        res.status(400).send({ error: "Invalid request"});
    }
});

// START ADD v2 Methods

// END ADD v2 Methods


module.exports = {
    router
}