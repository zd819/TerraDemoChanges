const express = require('express');
const router = express.Router();
const deleteUser = require('../functions/auth').deleteUser

// Create a new session on terra api and return result to frontend
router.get('/', (req, res) => {

    const userId = req.get('userId');
    console.log("Deleting User: " + userId);
    deleteUser(userId);
    res.sendStatus(200);

});



module.exports = router;