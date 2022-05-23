async function requestData(input){

    const id = input.userId;
    const startDate = input.startDate;
    const endDate = input.endDate;
    const dataModel = input.dataModel

    // const terra = new Terra('imperial-Ktod24UiJ6','03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10');
    // terra.setCurrentUser(id);

    console.log("Requesting Terra Data");

    // headers for widget containing our dev id and api key
    const apiHeaders = {'dev-id': 'imperial-Ktod24UiJ6', 'x-api-key': '03deeabbca244792bfb01a0883a4293e9a32cc863de7f7924e95af4b14089c10', 'Content-Type':'application/json'};
    const url = "https://api.tryterra.co/v2/"; 
    const options = {
        url: url + dataModel,
        data: JSON.stringify({}),       
        headers: apiHeaders,
        params: {"user_id": id, "start_date": startDate, "end_date": endDate},
        method: "GET"      
      };

    axios(options)
      .then(function(response){
        console.log('Terra Response');
        console.log(response.body);
      })
      .catch(function(error){
        console.log(error);
        console.log('Axios Error');
      })
}

module.exports = {requestData};
