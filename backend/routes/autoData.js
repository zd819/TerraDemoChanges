const express = require('express');
const router = express.Router();
const dataModel = require('../functions/getRelevantDataModels');
const getIds = require('../functions/getUserWearables');
const reqData = require('../functions/requestDataTerra');

router.get('/', function(req, res, next) {

    var today = new Date();
    var oneMonthAgo = today;
    oneMonthAgo.setMonth(oneMonthAgo.getMonth()-1);

    const userId = req.header.userId;
    const userWearables = getIds.getUserWearables(userId)
    

    for(var i = 0; i < userWearables.length; i++){

        const dataModels = dataModel.relevantDataModels(userWearable[i].provider);
        const terraId = userWearables[i].terraId;

        for(var j = 0; j < dataModels.length; j++){
            reqData.requestData({
                startDate: today.toISOString().slice(0, 10),
                endDate: oneMonthAgo.toISOString().slice(0, 10),
                userId: terraId,
                dataModel: dataModels[j]
            });
        }
    }

    res.sendStatus(200);
    
});



module.exports = router;