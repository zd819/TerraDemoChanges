var express = require('express');
var router = express.Router();

// destination for terra webhook 
router.post('/', (req,res) => {

    const payload = req;
    console.log('Payload From Terra');
    console.log(payload.body);
    console.log(payload.body.data);

    if(payload.status === "error") {
        // this is bad :/
        console.log("error oopsie");
    };


    if (payload.body.type === "auth") {

        // add terra user id to our users collection
        // usersDB.update({"_id":payload.reference_id}, {$push: {"wearable_ids":payload.user}});
        

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