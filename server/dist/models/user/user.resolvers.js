'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _apolloServer = require('apollo-server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { newApiKey } from '../../utils/auth'

const requireAuth = user => {
  if (!user) {
    throw new _apolloServer.AuthenticationError();
  }
};

const me = (() => {
  var _ref = _asyncToGenerator(function* (_, args, { user }) {
    yield requireAuth(user);
    return yield user;
  });

  return function me(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

const listUsers = (() => {
  var _ref2 = _asyncToGenerator(function* (_, args) {
    return yield _user2.default.find({}).lean().exec();
  });

  return function listUsers(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

const addWatched = (() => {
  var _ref3 = _asyncToGenerator(function* (_, { id }, { user }) {
    yield requireAuth(user);

    yield _user2.default.findByIdAndUpdate(user._id, { $pull: { watchLater: id }, $addToSet: { watched: id } }, { new: true }).lean().exec();
    return id;
  });

  return function addWatched(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})();

const addWatchLater = (() => {
  var _ref4 = _asyncToGenerator(function* (_, { id }, { user }) {
    yield requireAuth(user);

    yield _user2.default.findByIdAndUpdate(user._id, { $pull: { watched: id }, $addToSet: { watchLater: id } }, { new: true });
    return id;
  });

  return function addWatchLater(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
})();

const removeWatched = (() => {
  var _ref5 = _asyncToGenerator(function* (_, { id }, { user }) {
    yield requireAuth(user);

    yield _user2.default.findByIdAndUpdate(user._id, { $pull: { watched: id } }, { new: true });
    return id;
  });

  return function removeWatched(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
})();

const removeWatchLater = (() => {
  var _ref6 = _asyncToGenerator(function* (_, { id }, { user }) {
    yield requireAuth(user);

    yield _user2.default.findByIdAndUpdate(user._id, { $pull: { watchLater: id } }, { new: true });
    return id;
  });

  return function removeWatchLater(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
})();

const login = (() => {
  var _ref7 = _asyncToGenerator(function* (_, { email }) {
    let user;
    user = yield _user2.default.findOne({ email });
    if (!user) {
      user = yield _user2.default.create({ email });
    }
    return new Buffer(email).toString('base64');
  });

  return function login(_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
})();

exports.default = {
  Query: {
    me,
    listUsers
  },
  Mutation: {
    login,
    addWatched,
    addWatchLater,
    removeWatched,
    removeWatchLater
  }
};