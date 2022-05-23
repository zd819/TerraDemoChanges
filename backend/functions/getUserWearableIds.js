async function getWearableIDs(userID) {

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const userDB = db.collection("users");
            userDB.find({"_id":userID}, { projection : {wearable_id : 1}}, function(err,result) {
                if(err) {
                    console.log(err);
                }
                console.log("Retrieving User's Wearable IDs");
                client.close();
                return result;
        });
    });

}

module.exports = {getWearableIDs};