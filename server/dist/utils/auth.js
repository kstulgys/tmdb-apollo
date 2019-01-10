'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = undefined;

var _user = require('../models/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const isEmail = require('isemail');

const authenticate = exports.authenticate = (() => {
  var _ref = _asyncToGenerator(function* (req) {
    const auth = req.headers && req.headers.authorization || '';
    const email = new Buffer(auth, 'base64').toString('ascii');
    if (!isEmail.validate(email)) {
      return;
    }
    let user = yield _user2.default.findOne({ email });
    return user;
  });

  return function authenticate(_x) {
    return _ref.apply(this, arguments);
  };
})();

//? import cuid from 'cuid'

// export const newApiKey = () => {
//   return cuid()
// }

// export const authenticate = async req => {
//   const userEmail = req.headers.authorization

//   if (!userEmail) {
//     return
//   }

//   const user = await User.findOne({ apiKey })
//     .select('-password')
//     .lean()
//     .exec()

//   return user
// }