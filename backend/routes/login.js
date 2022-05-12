var express = require('express');
var router = express.Router();

// login handling
router.post('/', (req, res) => {
    console.log('Login Attempt');
    res.send(
        {
        token: 'test123'
        }
    );
});

module.exports = router;