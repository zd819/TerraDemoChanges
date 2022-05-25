
function pullData(vars, callback) {

    const startDate = new Date(vars.startDate).toISOString();
    const endDate = new Date(vars.endDate).toISOString();
    const terraId = vars.terraId;
    const type = vars.type

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const wearableDB = db.collection("wearable_data");
        wearableDB.aggregate( [ { $match : { $and: [ 
                            { "terraId" : terraId },
                            { "data.metadata.start_time" : { $gte : startDate }},
                            { "data.metadata.start_time" : { $lte : endDate }},
                            { "type" : type} 
                            ]}}]).
                            toArray( (err,res) => {
            client.close();

            callback(res);
        });
    });
}

module.exports = {pullData}