var express = require('express');
var router = express.Router();

// destination for terra webhook 
router.post('/', (req,res) => {

    

    console.log('received from terra');
    console.log(req);


    if (req.body.status === 'auth') {

        

    }else if (req.body.status === 'data') {

    };

    console.log('End of Handling');

});

async function handleAuth(data) {

};

async function handleData(data) {


};


module.exports = router;