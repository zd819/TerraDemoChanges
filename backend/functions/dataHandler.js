
async function handleData(body) {

    const wearable_id = body.user.user_id;

    switch(body.type) {

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

        default: // subscribed, bulk user info, user info, integrations
            


    }

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const wearableDB = db.collections("wearable_data");
        wearableDB.updateOne({"_id":wearable_id}, {$push : {"data.$.nutrition" : body.data}}, function(err) {
            if(err) {
                console.log(err);
            }
            console.log("Sending Data to Mongo");
            client.close();
        });

    });
}

module.exports = {handleData}