var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', (req, res) => {
    console.log('login attempt');
    res.send(
        {
        token: 'test123'
        }
    );
});

module.exports = router;