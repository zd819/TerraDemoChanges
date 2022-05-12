var express = require('express');
var router = express.Router();

// destination for terra webhook 
router.post('/', (req,res) => {

    const payload = req;
    console.log('Payload From Terra');
    console.log(payload);

    if(payload.status === "error") {
        // this is bad :/
    };


    if (payload.body.type === 'auth') {

        // add terra user id to our users collection
        db.users.update({"id":payload.reference_id}, {$push: {"wearable_ids":payload.user}});
        

    }else if (req.body.type === 'data') {



    };

    console.log('End of Handling Payload');

});

async function handleAuth(data) {

};

async function handleData(data) {


};


module.exports = router;