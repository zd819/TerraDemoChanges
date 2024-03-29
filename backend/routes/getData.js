const express = require('express');
const { processData } = require('../functions/formatData');
const router = express.Router();
const pullData = require('../functions/pullData').pullData;
const dayDifference = require('../functions/timeHelpers').dayDifference;
const findMissingDates = require('../functions/timeHelpers').findMissingDates;
const requestTerraData = require('../functions/requestTerraData').requestTerraData;
const getUserWearables = require('../functions/userFunctions').getUserWearables;

// Create a new session on terra api and return result to frontend
router.get('/', (req, res) => {

    const start = req.get('startDate');
    const end = req.get('endDate');
    const startDate = new Date(start); const endDate = new Date(end); const today = new Date();
    const type = req.get('type');
    const userId = req.get('userId');
    const provider = req.get('provider');
    console.log(provider + " " + type + " " + start + " " + end + " " + userId);

    if(startDate > endDate) {
        // error end date has to be bigger
        res.send({condition:"Error", message:"Start Date is after End Date"});
        return;
        
    } else if(startDate > today || endDate > today) {
        // error error
        res.send({condition:"Error", message:"One or more dates are in the future"});
        return;
    }


    getUserWearables(userId, function (wearableIds) {

        const wearable = wearableIds.find(wearable => wearable.provider === provider);
        if(wearable === undefined) {
            res.send({condition:"Error", message: "Provider not connected to this account"});
            return;
        }

        console.log("Data Requested from Frontend");
        pullData({
            startDate: startDate,
            endDate: endDate,
            terraId: wearable.terraId,
            type: type
        }, function(result){
            var length;
            if(result === undefined){
                length = 0;
            }else {
                length = result.length;
            }
            const period = dayDifference(startDate, endDate);
            console.log(period + " "  + result.length);

            // need to find missing dates and pull
            findMissingDates(startDate, endDate, result, (missingDates) => {

                if(missingDates.length === 0) {
                    //everything is fine
                    // process data and send
                    res.send({condition:"Success", result:processData(result, type)});

                } else {
                        console.log("Missing Dates");
                        console.log(missingDates);
                        for(var i = 0; i < missingDates.length; i++) {
                            requestTerraData(
                                {
                                    terraId: wearable.terraId,
                                    type: type,
                                    startDate: missingDates[i].startDate,
                                    endDate: missingDates[i].endDate
                                }, () => {
                                    // request fulfilled on server side now waiting for terra
                                });
                        }
                    }
                    res.send({condition:"Waiting for Terra", result:processData(result,type)});                  
            });
        });
    });
});

module.exports = router;