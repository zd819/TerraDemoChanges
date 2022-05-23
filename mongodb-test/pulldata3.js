const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const credentials = '../keys/mongo.pem'
global.mongoClient = new MongoClient('mongodb+srv://cluster0.skkxj.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1
  });


mongoClient.connect((err,client) => {            
    if(err) {
        console.log(err);
        throw err;
    }
    const db = client.db("Terra");
    const wearable = db.collection("users");

    const query = [{ $match : {_id : "user1"} } , { $unwind : '$wearableIds'}, {$project : {_id : 0} } ];
    // const wearable_provider_user = {provider : user.provider, terra_id: user.user_id}


    wearable.aggregate(query).toArray(function(err, res) {
        if (err) {
            throw err;
        }
        console.log(res);
        console.log("Query done");
        client.close();
    });
});
