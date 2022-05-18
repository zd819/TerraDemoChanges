const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const user_id = ['596be094-5daa-4962-bd60-0177c9439cec']
const { default: Terra } = require("terra-api");


// Create a new session on terra api and return result to frontend
router.post('/', (req, res) => {

    console.log("Get Data Request");
    const id = req.headers.userid;
    const dataModel = req.headers.dataModel
    const terra = new Terra('imperial-Ktod24UiJ6','03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10');
    terra.setCurrentUser(user_id[0]);

    // headers for widget containing our dev id and api key
    const apiHeaders = {'dev-id': 'imperial-Ktod24UiJ6', 'x-api-key': '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10', 'Content-Type':'application/json'};
    const url = "https://api.tryterra.co/v2/";    
    const options = {
        url: "https://api.tryterra.co/v2/" + "nutrition",
        data: JSON.stringify({}),       
        headers: apiHeaders,
        params: {"user_id": user_id[0], "start_date":"2018-11-07", "end_date":"2018-11-08"},
        method: "GET"      
      };

    axios(options)
      .then(function(response){
        console.log('Terra Response');
        console.log(response.body);
        res.send(response.data);
      })
      .catch(function(error){
        console.log(error);
        console.log('Axios Error');
      })

});

module.exports = router;