
async function handleData(payload) {

    const wearable_id = payload.user.user_id;

    switch(payload.type) {

        case 'athlete': 
            break;
        case 'sleep':
            break;
        case 'body':
            break;
        case 'menstruation':
            break; 
        case 'nutrition':
            break;
        case 'daily':
            break;
        case 'body':
            break;
        case 'activity':
            break;

        default:
    }

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const wearableDB = db.collection("wearable_data");
        const loc = "data." + payload.type;
        wearableDB.updateOne({"_id":wearable_id}, {$push : {[loc] : payload.data}}, function(err) {
            if(err) {
                console.log(err);
            }
            console.log("Sending Data to Mongo");
            client.close();
        });

    });
}

module.exports = {handleData}