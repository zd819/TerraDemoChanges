const express = require('express');
const router = express.Router();
const getUserWearables = require('../functions/getUserWearables').getUserWearables;

router.get('/one', (req, res) => {

    const userId = req.get('userId');
    const provider = req.get('provider');

    getUserWearables(userId, function (result) {

        res.send(result.find(ids => ids.provider = provider));

    });


});

router.get('/all', (req, res) => {

    const userId = req.get('userId');

    getUserWearables(userId, function (result) {

        res.send(result);

    });


});



module.exports = router;