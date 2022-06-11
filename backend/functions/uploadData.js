async function uploadData(payload) {

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
            const data = payload.data[i];
            const startDate = data.metadata.start_time;
            wearableDB.updateOne( {"terraId":terraId,"provider":prov,"type":type,"startDate":startDate},
                                    {$set : {"terraId":terraId, "provider":prov, "type":type, "data": data, "startDate": startDate}}, 
                                    {upsert:true}, function(err) {
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




module.exports = {uploadData}