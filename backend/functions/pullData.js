async function pullData(something) {

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const wearableDB = db.collection("wearable_data");
        const loc = "data." + payload.type;
        var items = 0;
        for(var i = 0; i < payload.data.length; i++){
            wearableDB.updateOne({"_id":wearable_id}, {$pull : {[loc] : payload.data[i]}}, function(err) {
                if(err) {
                    console.log(err);
                }
                console.log("Sending Data to Mongo");
                if(items === payload.data.length-1){
                    client.close();
                }
                items++;
            });
        }
    });
}