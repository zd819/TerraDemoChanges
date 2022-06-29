const express = require('express');
const router = express.Router();
const deleteUser = require('../functions/userFunctions').deleteUser;
const requestTerraData = require('../functions/requestTerraData').requestTerraData;
const getUserWearables = require('../functions/userFunctions').getUserWearables;

//some user methods

// returns all providers for the user
router.get('/getProviders', (req, res) => {

    const userId = req.get('userId');
    console.log("User Providers: " + userId);

    getUserWearables(userId, function (wearableIds){
        for(var i = 0; i < wearableIds.length; i++) {
            wearableIds[i] = wearableIds[i].provider;
        }
        res.send({providers: wearableIds});
    });
});

// delete user from 
router.get('/delete', (req, res) => {
    const userId = req.get('userId');
    console.log("Deleting User: " + userId);
    deleteUser(userId);
    res.sendStatus(200);
});


// specifically request certain data from terra
router.get('/requestData', (req, res) => {

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