const findCalories = require('./formatData').findCalories

function pullData(something, callback) {

    const startDate = new Date(something.startDate).toISOString();
    const endDate = new Date(something.endDate).toISOString();
    const terraId = something.terraId;

    console.log(startDate);

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const wearableDB = db.collection("wearable_data");
        wearableDB.aggregate( [ { $match : { $and: [ { "terraId" : terraId },
                            { "data.metadata.start_time" : { $gte : startDate }},
                            { "data.metadata.start_time" : { $lte : endDate }}]}}])
                            .toArray((err,res) => {
            client.close();
            for(var i = 0; i < res.length; i++){
                res[i] = findCalories(res[i]);
            }

            callback(res);
        });
    });
}

module.exports = {pullData}