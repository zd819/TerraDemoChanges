const axios = require('axios').default;

async function requestTerraData(input, callback){

    const terraId = input.terraId;
    const startDate = input.startDate;
    const endDate = input.endDate;
    const type = input.type

    console.log("Requesting Terra Data");
    console.log(input);

    // headers for widget containing our dev id and api key
    const apiHeaders = {'dev-id': 'imperial-Ktod24UiJ6', 'x-api-key': '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10', 'Content-Type':'application/json'};
    const url = "https://api.tryterra.co/v2/"; 
    const options = {
        url: url + type,
        data: JSON.stringify({}),       
        headers: apiHeaders,
        params: {"user_id": terraId, "start_date": startDate, "end_date": endDate},
        method: "GET"      
      };

    axios(options)
      .then(function(response){
        callback();
      })
      .catch(function(error){
        console.log("Axios error");
        console.log(error);
        callback();
      })
}

module.exports = {requestTerraData};
