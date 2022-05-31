
async function pullData(vars, callback) {

    const startDate = vars.startDate.toISOString();
    const endDate = vars.endDate.toISOString();
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
                            { "startDate" : { $gte : startDate }},
                            { "startDate" : { $lte : endDate }},
                            { "type" : type} 
                            ]}}]).
                            toArray( (err,res) => {
            if(err){
                throw err;
            }
            callback(res);
            client.close();

        });
    });
}

module.exports = {pullData}