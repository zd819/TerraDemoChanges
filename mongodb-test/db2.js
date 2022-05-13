
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const { json } = require('body-parser');

const credentials = '../keys/mongo.pem'

const client = new MongoClient('mongodb+srv://cluster0.skkxj.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});


async function data() { 
  console.log("inside data");
  const contents = fs.readFile('./terratest.json', 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data);
  var json = JSON.parse(data);
  toMongo(json);
  return json;
  });

  return contents;
};

function toMongo(data){
  client.connect(function(err, db) {
    if (err) throw err;
    var dbo = db.db("Terra");
    dbo.collection("users").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("sending to mongo");
      console.log(data);
      db.close();
    });
  });
}

data();
// function getJson() {
//   fs.readFile('./terratest.json', 'utf8', function (err, data) {
//   if (err) throw err;
//   console.log(data);
//   var json = JSON.parse(data);
// })
//   return json;
// };

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("Terra");
//     const collection = database.collection("users");
//     database.collection("users").insert(json, function(err, doc) {
//       console.log(data);
//       if(err) throw err;
//     });
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     console.log("Closed");
//     await client.close();
//   }
// }


