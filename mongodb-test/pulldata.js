const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const { json } = require('body-parser');

const credentials = '../keys/mongo.pem'

const client = new MongoClient('mongodb+srv://cluster0.skkxj.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});


client.connect(function(err, db) {
    if (err) throw err;
    var dbo = db.db("Terra");
    dbo.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });