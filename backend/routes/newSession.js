var express = require('express');
var router = express.Router();

// Create a new session on terra api and return result to frontend
router.post('/', (req, res) => {

    console.log('new session req');
    const id = req.headers.userid;
    console.log(id);
    // headers for widget containing our dev id and api key
    const apiHeaders = {'dev-id': 'imperial-Ktod24UiJ6', 'x-api-key': '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10'};

    const options = {
        body:{},
        method: 'POST',
        headers: apiHeaders        
      };
    
    console.log('prefetch');

    let session = fetch('https://api.tryterra.co/v2/auth/generateWidgetSession', options)
                    .then(data => {console.log('in fetch');data.json});
    console.log('return from fetch');
    console.log(session);
    res.send(session);

});

module.exports = router;
