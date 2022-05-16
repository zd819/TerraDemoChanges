const express = require('express');
const router = express.Router();

// destination for terra webhook 
router.post('/', (req,res,next) => {

    const payload = req;
    console.log('Payload From Terra');
    console.log(payload.body);
    console.log(payload.body.data);

    if(payload.status === "error") {
        // this is bad :/
        console.log("error oopsie");
        console.log(payload.body.message);
        next(createError(req.body));
    };

    //check terra doc, auth message
    // assume it is successful
    // store the data
    // connect to mongo
    // disconnect after storing
    
    if (payload.body.type === "auth") {
        
        mongoClient.connect((err,clt) => {
            
            if(err) {
                conslotchange.log(err);
                throw err;
            }

            db = clt.db("Terra");
            users = db.collections("users");
            wearable = db.collections("wearable_data");

            const wearable_provider_user = {provider : payload.body.provider, id: payload.body.user}
            users.updateOne( {_id:payload.body.reference_id}, {$push: {wearable_id:wearable_provider_user}}, function(err, res) {
                if (err) throw err;
                console.log("added new wearable id and its provider name");
            });

            db.close();
        });

    }else {

        console.log("data received");

        // wearableDB.update({"_id":payload.body.user.user_id}, {$push: {"data":payload.data}}, function(err){

        //     console.log("send to mongo");

        // });


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

    res.sendStatus(200);
    console.log('End of Handling Payload');


});

async function handleAuth(data) {

    


};

async function handleData(data) {


};


module.exports = router;