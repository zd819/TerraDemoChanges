const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const Terra = require('terra-api');
const user_id = ['995fce6a-2121-4f62-876e-cd221369f749','4470908c-9fa7-48a3-b67f-652504bf8337', '61713e5d-b16e-47e8-a841-8168806c2b9f', 'e2eeda22-2f53-4f0e-96ff-edadd2893c28', '3ac1fde5-83ee-4b14-8bc9-c40f30c49784', 'de4ede28-6c54-4148-b2e0-32de9a59aeac', '54903686-1da1-4c82-b58d-3c3fdbb8061b', '2b197d27-8bb6-45ae-9669-e000dbebe369', 'f843d3a4-5d8b-494a-8ff4-52fcfb2355fd']


// Create a new session on terra api and return result to frontend
router.post('/', (req, res) => {

    console.log("Get Data Request");
    const id = req.headers.userid;
    const terra = new Terra('imperial-Ktod24UiJ6','03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10');
    terra.setCurrentUser();

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