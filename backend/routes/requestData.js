const express = require('express');
const router = express.Router();
const requestTerraData = require('../functions/requestTerraData').requestTerraData
const getUserWearables = require('../functions/getUserWearables').getUserWearables;

// Create a new session on terra api and return result to frontend
router.get('/', (req, res) => {

    const start = req.get('startDate');
    const end = req.get('endDate');
    const startDate = new Date(start);
    const endDate = new Date(end);
    const provider = req.get('provider');
    const userId = req.get('userId');
    const type = req.get('type');


    
    getUserWearables(userId, function (wearableIds) {

        const wearable = wearableIds.find(wearable => wearable.provider === provider);
        if(wearable === undefined) {
            res.send({condition:"Error", message: "Provider not connected to this account"});
            return;
        }

        requestTerraData(                            
            {
            terraId: wearable.terraId,
            type: type,
            startDate: startDate.toISOString().substring(0,10),
            endDate: endDate.toISOString().substring(0,10)
            }, () => {
            // request fulfilled on server side now waiting for terra
                res.send({condition: "Requested Data"});
        });


    });



});



module.exports = router;