const router = require('express').Router();
const user = require('../router/user');

router.use(user);

module.exports = router;
