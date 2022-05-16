const express = require('express');
const router = express.Router();

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