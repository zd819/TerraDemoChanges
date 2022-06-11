const express = require('express');
const router = express.Router();
const uploadData = require('../functions/uploadData').uploadData;
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
    }else if(payload.status === "not_available") {
        console.log("Data not available from this wearable");
        next(createError("Data not available from this wearable"));
    };

    if(payload.hasOwnProperty('data')) {     

        uploadData(payload);
        
    }else {

        switch(type) {
            
            case 'auth':
                authStatus[payload.widget_session_id] = 'success';
                auth.addUserWearable(payload.user, payload.reference_id);
                break;
            case 'deauth':
                auth.deleteUserWearable(payload.user);
                break;
            case 'user_reauth':
                // need to delete old data / move it to new id in wearables collection
                auth.deleteUserWearable(payload.old_user);
                auth.addUserWearable(payload.new_user);
                break;
            case 'auth_failure':
                authStatus[payload.widget_session_id] = payload.reason;
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