const express = require('express');
const router = express.Router();
const User = require('../controller/user');
const Util = require('../../../util');

router.post('/user/login', User.login);

router.post('/users', User.addUser);

router.get('/users', Util.authCheck, User.getUsers);

router.get('/users/:id', Util.authCheck, User.getUserById);

router.put('/users/:id', Util.authCheck, User.updateUser);

router.delete('/user/:id', User.deleteUser);

module.exports = router;
