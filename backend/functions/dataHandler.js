

function idk(body) {

    const wearable_id = body.user.user_id;
    const provider = body.user.provider;

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

    mongoClient.connect((err) => {
    
        if(err) {
            conslotchange.log(err);
            throw err;
        }
    
        db = mongoClient.db("Terra");
        wearableDB = db.collections("wearable_data");

        wearableDB.updateOne({"_id":wearable_id}, {$push : {"data" : body.data}}, function(err){
            if(err) {
                console.log(err);
                
            }
            console.log("Sending Data to Mongo");

        })

    });
    

}