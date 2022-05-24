const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const user_id = ['596be094-5daa-4962-bd60-0177c9439cec'];
const pullData = require('../functions/pullData').pullData


// Create a new session on terra api and return result to frontend
router.get('/', (req, res) => {

    const body = req.body;

    console.log(req.body);
    pullData({
        startDate: body.startDate,
        endDate: body.endDate,
        terraId: body.terraId,
        type: body.type
    }, function(result){
        for(var i = 0; i < res.length; i++){
            result[i] = findCalories(result[i]);
        }
        console.log(result);
        res.send(result);
    })

});

module.exports = router;