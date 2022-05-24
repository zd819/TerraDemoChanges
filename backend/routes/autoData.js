const express = require('express');
const router = express.Router();
const dataModel = require('../functions/getRelevantDataModels');
const getIds = require('../functions/getUserWearables');
const reqData = require('../functions/requestDataTerra');

router.get('/', function(req, res, next) {

    const today = new Date();
    var oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth()-1);

    const userId = req.get('userId');
    // const userWearables = getIds.getUserWearables(userId);
    getIds.getUserWearables(userId, (userWearables) => {
        for(var i = 0; i < userWearables.length; i++){
            const dataModels = dataModel.relevantDataModels(userWearables[i].provider);
            const terraId = userWearables[i].terraId;
    
            for(var j = 0; j < dataModels.length; j++){
                console.log("into request data");
                reqData.requestData({
                    startDate: oneMonthAgo.toISOString().slice(0, 10) ,
                    endDate: today.toISOString().slice(0, 10),
                    userId: terraId,
                    dataModel: dataModels[j]
                });
            }
        }
    });

    // for(var i = 0; i < userWearables.length; i++){

    //     const dataModels = dataModel.relevantDataModels(userWearable[i].provider);
    //     const terraId = userWearables[i].terraId;

    //     for(var j = 0; j < dataModels.length; j++){
    //         reqData.requestData({
    //             startDate: today.toISOString().slice(0, 10),
    //             endDate: oneMonthAgo.toISOString().slice(0, 10),
    //             userId: terraId,
    //             dataModel: dataModels[j]
    //         });
    //     }
    // }

    res.sendStatus(200);
    
});



module.exports = router;