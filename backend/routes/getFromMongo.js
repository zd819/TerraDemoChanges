const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const user_id = ['596be094-5daa-4962-bd60-0177c9439cec'];
const pullData = require('../functions/pullData').pullData
const findCalories = require('../functions/formatData').findCalories


// Create a new session on terra api and return result to frontend
router.get('/', (req, res) => {
    
    pullData({
        startDate: req.get('startDate'),
        endDate: req.get('endDate'),
        terraId: req.get('terraId'),
        type: req.get('type')
    }, function(result){
        for(var i = 0; i < result.length; i++){
            result[i] = findCalories(result[i]);
        }
        console.log(result);
        res.send(result);
    })

});

module.exports = router;