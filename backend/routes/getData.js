const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const user_id = ['4470908c-9fa7-48a3-b67f-652504bf8337', '61713e5d-b16e-47e8-a841-8168806c2b9f', 'e2eeda22-2f53-4f0e-96ff-edadd2893c28', '3ac1fde5-83ee-4b14-8bc9-c40f30c49784', 'de4ede28-6c54-4148-b2e0-32de9a59aeac', '54903686-1da1-4c82-b58d-3c3fdbb8061b', '150d1915-39d4-4137-8e11-d480a9222f02']


// Create a new session on terra api and return result to frontend
router.post('/', (req, res) => {

    console.log('Get Data Request');
    const id = req.headers.userid;

    // headers for widget containing our dev id and api key
    const apiHeaders = {'dev-id': 'imperial-Ktod24UiJ6', 'x-api-key': '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10', 'Content-Type':'application/json'};

    const url = 'https://api.tryterra.co/v2/';
    
    const options = {
        url: 'https://api.tryterra.co/v2/' + req.body.datatype,
        data: JSON.stringify({}),       
        headers: apiHeaders,
        params: {'user_id': user_id[0], 'start_date':'1970-01-01'},
        method: 'GET'      
      };
    

    axios(options)
      .then(function(response){
        console.log('Terra Response');
        res.send(response.data);
      })
      .catch(function(error){
        console.log(error);
        console.log('Axios Error');
      })

});




module.exports = router;