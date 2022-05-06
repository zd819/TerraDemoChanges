var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', (req,res) => {

    

    console.log('received from terra');
    console.log(req);

});

module.exports = router;