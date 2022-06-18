const express = require('express');
const { processData } = require('../functions/formatData');
const router = express.Router();
const user_id = ['596be094-5daa-4962-bd60-0177c9439cec'];
const pullData = require('../functions/pullData').pullData
const dayDifference = require('../functions/timeHelpers').dayDifference
const findMissingDates = require('../functions/timeHelpers').findMissingDates
const requestTerraData = require('../functions/requestTerraData').requestTerraData

// Create a new session on terra api and return result to frontend
router.get('/', (req, res) => {

    const start = req.get('startDate');
    const end = req.get('endDate');
    const startDate = new Date(start);
    const endDate = new Date(end);
    const today = new Date();
    console.log(req.get('type'));
    const terraId = req.get('terraId');
    const type = req.get('type');
    const reqId = terraId + type + start + end;


    if(startDate > endDate) {
        // error end date has to be bigger
        res.send({status:"Error", message:"Start Date is after End Date"});
        //throw "end date needs to be bigger than start";
        
    } else if(startDate > today || endDate > today) {
        // error error
        res.send({status:"Error", message:"One or more dates are in the future"});
        //throw "dates in the future";
    } else {

        console.log("Data Requested from Frontend");
        pullData({
            startDate: startDate,
            endDate: endDate,
            terraId: terraId,
            type: type
        }, function(result){
            var length;
            if(result === undefined){
                length = 0;
            }else {
                length = result.length;
            }
            const period = dayDifference(startDate, endDate);
            console.log(period);
            //console.log(result);
            if(result.length > period) {
                // too many results there has to be an error somewhere 
                // this should never happen there must be something wrong inside mongo / pushing data
                next(createError("DB Error"));
            }else if(result.length < period) {
                // need to find missing dates and pull
                dataRequest[reqId] = 1;
                findMissingDates(startDate, endDate, result, (missingDates) => {
                    console.log(missingDates);
                    for(var i = 0; i < missingDates.length; i++) {
                        requestTerraData(
                            {
                                terraId: req.get('terraId'),
                                type: req.get('type'),
                                startDate: missingDates[i].startDate,
                                endDate: missingDates[i].endDate
                            }, () => {
                                dataRequest[terraId + type + start + end] = 2;
                                // request fulfilled on server side now waiting for terra
                            });
                    }
                });
                res.send({status:"Waiting for Terra", result:result});
            }else {
                delete dataRequest[reqId];
                //everything is fine
                // process data and send
                result = processData(result, req.get('type'));
                res.send({status:"Success", result:result});
            }

        })
    }

});

module.exports = router;