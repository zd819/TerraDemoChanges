const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const { default: Terra } = require("terra-api");

// Create a new session on terra api and return result to frontend
async function newSession(req, res) {

    const id = req.headers.userid;
    const terra = new Terra('imperial-Ktod24UiJ6', '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10');
    console.log("New Widget Session requested");
    console.log("User Id: " + id);
    res.send(await terra.generateWidgetSession(id, ["FITBIT","OURA","TRAININGPEAKS","WITHINGS","SUUNTO","PELOTON","ZWIFT","GARMIN","EIGHT","WAHOO","GOOGLE","POLAR","APPLE","FREESTYLELIBRE","TEMPO","IFIT","CONCEPT2"]
    ,'EN'));

    
    // headers for widget containing our dev id and api key
    // const apiHeaders = {'dev-id': 'imperial-Ktod24UiJ6', 'x-api-key': '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10', 'Content-Type':'application/json'};

    // const options = {
    //     url: 'https://api.tryterra.co/v2/auth/generateWidgetSession',
    //     data: JSON.stringify({'reference_id': id, 'language':'EN'}),       
    //     headers: apiHeaders,
    //     method: 'POST'      
    //   };
    
    // axios(options)
    //   .then(function(response){
    //     console.log('Response from Terra');
    //     res.send(response.data);
    //   })
    //   .catch(function(error){
    //     console.log(error);
    //     console.log('Axios Error');
    //   })


};


module.exports = newSession;
