async function updateWearable(oldUser, newUser) {

    const terraId = oldUser.user_id;
    userDB.updateMany({"wearableIds.$.terraId": terraId}, {$set : {"wearableIds.$.terraId":newUser.user__id} } , function(err, res) {
        if (err) {
            throw err;
        }
        console.log("Updated wearable");
    });
    deleteUserData(terraId);
};

async function deauthWearable(user) {

    const terraId = user.user_id;
    const wearable_provider_user = {provider : user.provider, terraId: terraId};
    userDB.updateMany({wearableIds : wearable_provider_user}, {$pull : {wearableIds:wearable_provider_user} } , function(err, res) {
        if (err) {
            throw err;
        }
        console.log("Updated wearable");
    });
    deleteUserData(terraId);
}

async function deleteUserData(terraId){

    wearableDB.deleteMany({terraId : terraId}, (err) => {
        console.log(err);
        console.log("Deleted old user data");
    });
};

async function addUserWearable(user, userId) {

    const wearable_provider_user = {provider : user.provider, terraId: user.user_id}
    userDB.updateOne( {_id:userId}, {$push: {wearableIds:wearable_provider_user}}, function(err, res) {
        if (err) {
            throw err;
        }
        console.log("Added new Wearable Id");
    });
};

async function addNewUser(userId, callback) {

    userDB.updateOne( {_id:userId}, {$setOnInsert: {wearableIds:[]}}, {upsert:true}, function(err, res) {
        if (err) {
            callback(err);
            throw err;
        }
        console.log("Added new User");
        callback("success");
    });
};

async function deleteUser(userId) {
    
    getUserWearables(userId, function (wearableIds) {
        for(var i = 0; i < wearableIds.length; i++){
            deleteUserData(wearableIds[i].terraId);
        }
        userDB.deleteOne({_id : userId});
    });
};

async function getUserWearables(userId, callback) {

    userDB.findOne({_id:userId}, {'_id': false}, function(err, res) {
        if(err) {
            throw err;
        }
        if(res == null || res.wearableIds == null) {
            callback([])
        } else {
            callback(res.wearableIds);
        }
    });
};


module.exports = {updateWearable, addUserWearable, deleteUserData, addNewUser, deleteUser, deauthWearable, getUserWearables};