const express = require('express');
const router = express.Router();
const uploadData = require('../functions/uploadData').uploadData;
const auth = require('../functions/auth');
const createError = require('http-errors');

// destination for terra webhook 
router.post('/', (req,res,next) => {

    res.sendStatus(200);
    const payload = req.body;
    const type = payload.type;
    console.log('Payload From Terra - ' + type);

    if(payload.status === "error") {
        // this is bad :/
        console.log("error oopsie");
        console.log(payload.message);
        next(createError(payload));
        return;
    }else if(payload.status === "not_available") {
        console.log("Data not available from this wearable");
        next(createError("Data not available from this wearable"));
        return;
    };

    if(payload.hasOwnProperty('data')) {     

        uploadData(payload);
        
    }else {

        switch(type) {
            
            case 'auth':
                console.log("User Auth");
                auth.addUserWearable(payload.user, payload.reference_id);
                break;
            case 'deauth':
                auth.deauthWearable(payload.user);
                break;
            case 'user_reauth':
                // need to delete old data / move it to new id in wearables collection
                console.log("Reauth");
                console.log(payload.reference_id);
                auth.updateWearable(payload.old_user, payload.new_user);
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
            case 'google_no_datasource':
                break;
            case 'auth_success':
                break;
            default:  // subscribed, bulk user info, user info, integrations;
        }
    }

    console.log('End of Handling Payload');
});


module.exports = router;