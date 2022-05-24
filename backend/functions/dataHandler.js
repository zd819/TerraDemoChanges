
async function handleData(payload) {

    const prov = payload.user.provider;
    const terraId = payload.user.user_id
    const type = payload.type;

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const wearableDB = db.collection("wearable_data");
        var items = 0;
        for(var i = 0; i < payload.data.length; i++){
            wearableDB.insertOne({"terraId":terraId, "provider":prov, "type":type, "data": payload.data[i]}, function(err) {
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

module.exports = {handleData}