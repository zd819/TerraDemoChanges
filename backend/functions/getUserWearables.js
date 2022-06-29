
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


module.exports = {getUserWearables};

