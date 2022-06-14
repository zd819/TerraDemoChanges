const express = require('express');
const router = express.Router();
const getUserWearables = require('../functions/getUserWearables').getUserWearables

// Create a new session on terra api and return result to frontend
router.get('/', (req, res) => {

    const userId = req.get('userId');
    getUserWearables(userId, function (wearableIds){
        for(var i = 0; i < wearableIds.length; i++) {
            wearableIds[i] = wearableIds.provider;
        }
        res.send({providers: wearableIds});
    });

});

module.exports = router;