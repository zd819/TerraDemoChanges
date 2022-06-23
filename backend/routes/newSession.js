const express = require('express');
const router = express.Router();
const { default: Terra } = require("terra-api");
const addNewUser = require('../functions/auth').addNewUser;

// Create a new session on terra api and return result to frontend

router.get('/', (req, res) => {

    const id = req.get('userId');
    const terraApi = new Terra('imperial-Ktod24UiJ6', '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10');
    console.log("New Widget Session requested");
    console.log("User Id: " + id);

    addNewUser(id, function (result){
    });

    terraApi.generateWidgetSession(id, ["FITBIT","OURA","TRAININGPEAKS","WITHINGS","SUUNTO","PELOTON","ZWIFT","GARMIN","EIGHT","WAHOO","GOOGLE","POLAR","APPLE","FREESTYLELIBRE","TEMPO","IFIT","CONCEPT2","MYFITNESSPAL"],'EN')
    .then((s) => res.send(s))
    .catch((e) => console.log(e));



});


module.exports = router;