async function deleteUserWearable(user) {

    const terraId = user.user_id;

    const wearable_provider_user = {provider : user.provider, terraId: terraId};
    userDB.update( {}, {$pull: {wearableIds : wearable_provider_user} }, function(err, res) {
        if (err) {
            throw err;
        }
        console.log("Deleted old user");
    });

    deleteUserData(user);
};

async function deleteUserData(user){

    const terraId = user.user_id;
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

    userDB.updateOne( {_id:userId}, {$setOnInsert: {wearableIds:undefined}}, {upsert:true}, function(err, res) {
        if (err) {
            callback(err);
            throw err;
        }
        console.log("Added new User");
        callback("success");
    });
    return;
};

module.exports = {deleteUserWearable, addUserWearable, deleteUserData, addNewUser};