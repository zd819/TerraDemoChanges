
async function getUserWearables(userId) {

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const userDB = db.collection("users");
        const query = [{ $match : {_id : userId} } , { $unwind : '$wearableIds'}, {$project : {_id : 0} } ];

        userDB.aggregate(query).toArray(function(err, res) {
            if (err) {
                throw err;
            }
            console.log("Retrieving User's Wearable IDs");
            client.close();
            return res;
        });
    });

}

module.exports = {getUserWearables};