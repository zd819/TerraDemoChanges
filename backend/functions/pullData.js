async function pullData(something) {

    const startDate = something.startDate;
    const endDate = something.endDate;

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const wearableDB = db.collection("wearable_data");
        const loc = "data." + payload.type;
        wearableDB.find({"_id":wearable_id}, {projection : {[loc] : payload.data[i]}}, function(err,result) {
            
            if(err) {
                console.log(err);
            }
            console.log("Sending Data to Mongo");
             client.close();
        });
    });
}