const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost', // host for connection
    port: 3306, // default port for mysql is 3306
    database: 'TerraDB', // database from which we want to connect out node application
    user: 'root', // username of the mysql connection
    password: '@liang99' // password of the mysql connection
    });

connection.connect(function (err) {
    if(err){
        console.log("error occured while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
});