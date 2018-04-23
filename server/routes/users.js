var express = require('express');
var router = express.Router();
const User = require('../controllers/users.controller')

/* GET users listing. */
router.post('/loginfb', User.loginFacebook)



module.exports = router;
