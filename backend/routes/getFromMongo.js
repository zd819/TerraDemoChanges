const express = require('express');
const { processData } = require('../functions/formatData');
const router = express.Router();
const axios = require('axios').default;
const user_id = ['596be094-5daa-4962-bd60-0177c9439cec'];
const pullData = require('../functions/pullData').pullData
const findCalories = require('../functions/formatData').findCalories
const dayDifference = require('../functions/timeHelpers').dayDifference


// Create a new session on terra api and return result to frontend
router.get('/', (req, res) => {

    const startDate = new Date(req.get('startDate'));
    const endDate = new Date(req.get('endDate'));
    const today = new Date();

    if(startDate > endDate) {
        // error end date has to be bigger
    } else if(startDate > today || endDate > today) {
        // error error
    }

    console.log("Data Requested from Frontend");
    pullData({
        startDate: startDate,
        endDate: endDate,
        terraId: req.get('terraId'),
        type: req.get('type')
    }, function(result){

        const period = dayDifference(startDate, endDate);
        if(result.length > period) {

            // too many results there has to be an error somewhere 
            // this should never happen there must be something wrong inside mongo / pushing data

        }else if(result.length < period) {

            // need to find missing dates and pull
            dataRequest = 1;

        }else {

            //everything is fine
            // process data and send
            processData(result, req.get('type'));

        }


        console.log(result);
        res.send(result);
    })

});

module.exports = router;