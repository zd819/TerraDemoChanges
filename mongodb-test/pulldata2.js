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
    const wearable = db.collection("wearable_data");

    // const pipeline = [
    //     { $match: { "data.nutrition.metadata.start_time": "2018-11-07T00:00:00+00:00" } },
    //     { $unwind: "$data" }
    // ];

    // wearable.aggregate([
    //     { $match: { _id: "596be094-5daa-4962-bd60-0177c9439cec" } },
    //     { $unwind: "$data" }],
    //     function(err, res) {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log(res);
    //         console.log("Query done");
    //         client.close();
    //     }
        // );
    
        // wearable.aggregate([
        //     { $match: { _id: "596be094-5daa-4962-bd60-0177c9439cec" } },
        //     { $unwind: "$data" }
        // ], function(err, result) {
        //     if(err) {
        //         db.close();
        //         throw err;
        //     }
        //     console.log(result);
        //     db.close();
        // });


    const query = [{ $match : {_id : "596be094-5daa-4962-bd60-0177c9439cec"} }, 
                   { $unwind:  "$data.nutrition" }
                ];
    // "data.nutrition.metadata.start_time": "2018-11-07T00:00:00+00:00"
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

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var query = { address: "Park Lane 38" };
//     dbo.collection("customers").find(query).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
//   }); , data.nutrition[0].metadata.start_time: "2018-11-07T00:00:00+00:00"