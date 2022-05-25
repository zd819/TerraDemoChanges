const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const requestTerraData = require('../functions/requestTerraData').requestTerraData
const pullMongoData = require('../functions/pullData').pullData
const dayDifference = require('../functions/timeHelpers').dayDifference

// checks mongo before requesting from terra if data doesnt exist.
router.get('/', (req, res) => {

    console.log("Get Data Request");
    const startDate = req.startDate;
    const terraId = req.terraId;
    const endDate = req.endDate;
    const type = req.type;
     
    const mongoData = pullMongoData({
                        terraId : terraId,
                        startDate : startDate,
                        endDate : endDate,
                        type : type
                      });
    
    console.log(mongoData)

    // if true incomplete data set between mongo and dates specified.
    if(mongoData.length == dayDifference(startDate, endDate)){

    }else if(mongoData.length > dayDifference) {
        // duplicate data entries
    }else {
      requestTerraData({
        terraId : terraId,
        startDate : startDate,
        endDate : endDate,
        type : type
      });
      
      // now we have to wait to get the data. need something to notify this process when its here so we can reply.
    }



});

module.exports = router;