const express = require('express');
const router = express.Router();
// In memory Storage
const items = [
    {
        id: '1',
        name: 'buy bananas',
        description: 'buy some bananas at tesco'
    },
    {
        id: '2',
        name: 'buy chocolate',
        description: 'buy some chocolate with 85%'
    },
    {
        id: '3',
        name: 'buy apples',
        description: 'buy some apples at tesco'
    }
];

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