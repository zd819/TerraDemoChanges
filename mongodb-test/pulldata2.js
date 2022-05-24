const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const credentials = '../keys/mongo.pem'
global.mongoClient = new MongoClient('mongodb+srv://cluster0.skkxj.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1
  });

async function run(){
    mongoClient.connect((err,client) => {            
        if(err) {
            console.log(err);
            throw err;
        }
        const db = client.db("Terra");
        const wearable = db.collection("wearable_data");
        console.log("connected");

        const query = [{ $match : {_id : "596be094-5daa-4962-bd60-0177c9439cec"} }, 
                    { $unwind:  "$data.nutrition" }
                    ];
        // "data.nutrition.metadata.start_time": "2018-11-07T00:00:00+00:00"
        // const wearable_provider_user = {provider : user.provider, terra_id: user.user_id}

//'_id':"596be094-5daa-4962-bd60-0177c9439cec", 'data.nutrition.metadata.start_time' : { $gte : new Date('2022-05-17")')}
        // wearable.find({'data.metadata.start_time' : {$gte : new Date('2022-05-17')}}).forEach(function(err,doc) {
        //     console.log(doc);
        //     console.log(err);
        //     console.log("hi");
        // })

        // console.log("hello");
        // wearable.find({}).forEach(function(err,doc){
        //     console.log(doc);
        // })

        wearable.aggregate( [ { $match : { $and: [ { "terraId" : "596be094-5daa-4962-bd60-0177c9439cec" } , { "data.metadata.start_time" : { $gte : new Date("2022-05-17").toISOString() } } ] } } ] ).toArray((err,res) => {
            console.log(res);
        });
    });
}

run();

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