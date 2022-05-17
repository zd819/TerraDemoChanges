async function deleteUserWearable(user) {
    mongoClient.connect((err,client) => {            
        if(err) {
            console.log(err);
            throw err;
        }
        const db = client.db("Terra");
        const users = db.collection("users");
        const wearable_provider_user = {provider : user.provider, terra_id: user.user_id}
        users.updateOne( {_id:"user1"}, {$pull: {wearable_id:wearable_provider_user}}, function(err, res) {
            if (err) {
                throw err;
            }
            console.log("Deleted old user");
            client.close();
        });
    });
}


async function addUserWearable(user) {
    mongoClient.connect((err,client) => {          
        if(err) {
            console.log(err);
            throw err;
        }
        const db = client.db("Terra");
        const users = db.collection("users");
        const wearable_provider_user = {provider : user.provider, terra_id: user.user_id}
        users.updateOne( {_id:"user1"}, {$push: {wearable_id:wearable_provider_user}}, function(err, res) {
            if (err) {
                throw err;
            }
            console.log("Added new Terra User");
            client.close();
        });
    });
}

module.export = {deleteUserWearable, addUserWearable};