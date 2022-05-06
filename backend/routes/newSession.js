const express = require('express');
const router = express.Router();
const axios = require('axios').default;


// Create a new session on terra api and return result to frontend
router.post('/', (req, res) => {

    console.log('new session req');
    const id = req.headers.userid;
    console.log(id);
    // headers for widget containing our dev id and api key
    const apiHeaders = {'dev-id': 'imperial-Ktod24UiJ6', 'x-api-key': '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10', 'Content-Type':'application/json'};

    const options = {
        url: 'https://api.tryterra.co/v2/auth/generateWidgetSession',
        data: JSON.stringify({'reference_id':id , 'language':'EN'}),       
        headers: apiHeaders,
        method: 'POST'      
      };
    
    console.log('prefetch');

    axios(options)
      .then(function(response){
        console.log('received res');
        console.log(response.data);
        res.send(response.data)
      })
      .catch(function(error){
        console.log(error);
        console.log('error from axios');
      })
    console.log('return from fetch');

});


module.exports = router;
