const express = require('express');
const router = express.Router();
const dataHelp = require('../functions/dataHandler');
const auth = require('../functions/auth');

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

    if(data in payload === true) {     

        dataHelp.handleData(payload);
        
    }else {

        switch(type) {
            
            case 'auth':
                auth.addUserWearable(payload.user);
                break;
            case 'deauth':
                auth.deleteUserWearable(payload.user);
                break;
            case 'user_reauth':
                auth.deleteUserWearable(payload.old_user);
                auth.addUserWearable(payload.new_user);
                break;
            case 'auth_failure':
                break;
            case 'access_revoked':
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

    
    
    // if (type === "auth") {
        
    //     addUserWearable(payload.user);

    // }else if(type === "user_reauth"){

    //     deleteUserWearable(payload.old_user);
    //     addUserWearable(payload.new_user);

    // }else if(type === "deauth"){
        
    //     deleteUserWearable(payload.user);

    // }else {
        
    //     mongoClient.connect((err,client) => {
            
    //         if(err) {
    //             console.log(err);
    //             throw err;
    //         }

    //         const db = client.db("Terra");
    //         const wearable = db.collection("wearable_data");

    //         console.log("data received");
    //         const wearable_provider = payload.user.provider;
    //         console.log(wearable_provider);
    //         const wearable_id =  payload.user.user_id;
    //         console.log(wearable_id);
    //         const wearable_data = payload.data;
    //         console.log(wearable_data);
    //         wearable.updateOne( {_id:wearable_id , provider: wearable_provider }, {$push: {data:wearable_data}}, function(err, res) {
    //             if (err) throw err;
    //             console.log("added data");
    //             client.close();
    //             console.log("connection closed");
    //         });
    //     });
    // };

    console.log('End of Handling Payload');
});


module.exports = router;