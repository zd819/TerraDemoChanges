const express = require('express');
const router = express.Router();
const dataHelp = require('../functions/dataHandler');

// destination for terra webhook 
router.post('/', (req,res,next) => {

    res.sendStatus(200);
    const payload = req.body;
    const type = payload.type;
    console.log('Payload From Terra');
    console.log(payload);
    console.log(payload.data);

    if(payload.status === "error") {
        // this is bad :/
        console.log("error oopsie");
        console.log(payload.message);
        next(createError(payload));
    };

    /*

    if(data in payload === true) {
        
        dataHelp.handleData(payload);


    }else {

        switch(type) {
            
            case 'auth':
                addUserWearable(payload.user);
                break;
            case 'deauth':
                deleteUserWearable(payload.user);
                break;
            case 'user_reauth':
                deleteUserWearable(payload.old_user);
                addUserWearable(payload.new_user);
                break;
            case 'auth_failure':
                break;
            case 'access_revoked'
                break;
            case 'connection_error':
                break;
            case 'google_no_datasource':
                break;
            case 'request_completed':
                break;
            case 'request_processing':
                break;
            case 'processing':
                break;
            default:

        }
    }

    */
    
    if (type === "auth") {
        
        addUserWearable(payload.user);

    }else if(type === "user_reauth"){

        deleteUserWearable(payload.old_user);
        addUserWearable(payload.new_user);

    }else if(type === "deauth"){
        
        deleteUserWearable(payload.user);

    }else {
        
        mongoClient.connect((err,client) => {
            
            if(err) {
                console.log(err);
                throw err;
            }

            const db = client.db("Terra");
            const wearable = db.collection("wearable_data");

            console.log("data received");
            const wearable_provider = payload.user.provider;
            console.log(wearable_provider);
            const wearable_id =  payload.user.user_id;
            console.log(wearable_id);
            const wearable_data = payload.data;
            console.log(wearable_data);
            wearable.updateOne( {_id:wearable_id , provider: wearable_provider }, {$push: {data:wearable_data}}, function(err, res) {
                if (err) throw err;
                console.log("added data");
                client.close();
                console.log("connection closed");
            });

        });
        


    };


    // function toMongo(data){
    //     client.connect(function(err, db) {
    //       if (err) throw err;
    //       var dbo = db.db("Terra");
    //       dbo.collection("users").insertOne(data, function(err, res) {
    //         if (err) throw err;
    //         console.log("sending to mongo");
    //         console.log(data);
    //         db.close();
    //       });
    //     });
    //   }

    console.log('End of Handling Payload');


});

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



module.exports = router;