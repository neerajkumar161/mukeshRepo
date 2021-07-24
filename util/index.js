const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../api/v1/model/user');
const PRIVATE_KEY = 'GEOIOASHBHGHDALMSKNJ$2435DBVUIGDUILS^5451&WE512';

exports.generatePassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};

exports.checkPassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

exports.generateToken = async (parameter) => {
  return jwt.sign(parameter, PRIVATE_KEY, { expiresIn: '2h' });
};

exports.authCheck = (req, res, next) => {
  try {
    console.log('dfsdfsdf', req.headers);

    jwt.verify(req.headers.authentication, PRIVATE_KEY, async (err, token) => {
      if (err) throw 'Token Error';
      console.log('Token', token);
      let user = await User.findOne().lean();
      if (!user) throw 'No User Find.';
      console.log(user);
      req.user = user;
      console.log(req.user);
      next();
    });
  } catch (err) {
    next(err);
  }
};
