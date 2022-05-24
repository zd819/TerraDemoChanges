async function deleteUserWearable(user) {

    const terraId = user.user_id;

    mongoClient.connect((err,client) => {            
        if(err) {
            console.log(err);
            throw err;
        }
        const db = client.db("Terra");
        const users = db.collection("users");
        const wearable = db.collection("wearable_data");
        const wearable_provider_user = {provider : user.provider, terraId: user.user_id}
        users.update( {}, {$pull: {wearableIds : wearable_provider_user} }, function(err, res) {
            if (err) {
                throw err;
            }
            console.log("Deleted old user");
            client.close();
        });
    });

    deleteUserData(user);
}

async function deleteUserData(user){

    const terraId = user.user_id;

    mongoClient.connect((err,client) => {            
        if(err) {
            console.log(err);
            throw err;
        }
        const db = client.db("Terra");
        const wearable = db.collection("wearable_data");
        const wearable_provider_user = {provider : user.provider, terraId: user.user_id}
        wearable.deleteMany({terraId : terraId}, (err) => {
            console.log(err);
            console.log("Deleted old user data");
            client.close();
        }) 
    });


}

async function addUserWearable(user, userId) {
    mongoClient.connect((err,client) => {          
        if(err) {
            console.log(err);
            throw err;
        }
        const db = client.db("Terra");
        const users = db.collection("users");
        const wearable_provider_user = {provider : user.provider, terraId: user.user_id}
        users.updateOne( {_id:userId}, {$push: {wearableIds:wearable_provider_user}}, function(err, res) {
            if (err) {
                throw err;
            }
            console.log("Added new Terra User");
            client.close();
        });
    });
}

module.export = {deleteUserWearable, addUserWearable, deleteUserData};