const User = require('../model/user');
const Util = require('../../../util');

exports.getUsers = async (req, res, next) => {
  try {
    let users = await User.find({}, { __v: 0 }).sort({
      createdAt: -1,
    });
    if (users) return res.status(200).json(users);
    else next('No user find.');
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id).select('_id name');
    if (user) return res.status(200).json(user);
    else next('No user find.');
  } catch (error) {
    next(error);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    console.log('Im here');
    let existUser = await User.findOne({ email: req.body.email, phone: req.body.phone }).lean();
    if (existUser) throw 'User already exist.';
    else {
      req.body.password = await Util.generatePassword(req.body.password);
      let user = await User.create(req.body);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) return res.status(200).json(user);
    else next('No user find');
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let deleteUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser) return res.status(200).json({ message: 'User deleted' });
    else next('Something went wrong.');
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean();
    if (!user) throw 'No user register.';
    let passwordMatch = await Util.checkPassword(req.body.password, user.password);
    let authentication = await Util.generateToken({ _id: user._id.toString(), type: 'Login' });
    if (!passwordMatch) throw 'Invalid credential';
    return res.status(200).json({ user, authentication });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    console.log('Im in getUser Controller');
    let user = await User.findById(req.user._id).lean();
    if (!user) throw 'No user exists.';
    else res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
