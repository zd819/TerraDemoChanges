
async function getUserWearables(userId, callback) {

    mongoClient.connect((err,client) => {    
        if(err) {
            console.log(err);
            throw err;
        }  
        const db = client.db("Terra");
        const userDB = db.collection("users");
        const query = [{ $match : {_id : userId} } , { $unwind : '$wearableIds'}, {$project : {_id : 0} } ];

        userDB.findOne({_id:userId}, {'_id': false}, function(err, res){
            if(err) {
                throw err;
            }
            console.log("Retrieving Ids");
            console.log(res);
            client.close();
            callback(res.wearableIds);
        })
    });

}

module.exports = {getUserWearables};

