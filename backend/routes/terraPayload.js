const express = require('express');
const router = express.Router();

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

    //check terra doc, auth message
    // assume it is successful
    // store the data
    // connect to mongo
    // disconnect after storing

    /*

    if(data in payload === false) {
        
        // data


    }


        switch(type) {
            
            case 'auth':




                break;
            case 'deauth':
                break;
            case 'user_reauth':
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

async function handleAuth(data) {

    


};

async function handleData(data) {


};

async function addUserWearable(user) {

    mongoClient.connect((err,client) => {
            
        if(err) {
            conslotchange.log(err);
            throw err;
        }

        const db = client.db("Terra");
        const users = db.collection("users");
        const wearable = db.collection("wearable_data");

        const wearable_provider_user = {provider : user.provider, terra_id: user.user_id}
        users.updateOne( {_id:"user1"}, {$push: {wearable_id:wearable_provider_user}}, function(err, res) {
            if (err) {
                throw err;
            }
            console.log("added new wearable id and its provider name");
            client.close();
        });
    });

}

module.exports = router;