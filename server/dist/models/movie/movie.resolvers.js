'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _movie = require('./movie.model');

var _movie2 = _interopRequireDefault(_movie);

var _apolloServer = require('apollo-server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { newApiKey } from '../../utils/auth'

const requireAuth = user => {
  if (!user) {
    throw new _apolloServer.AuthenticationError();
  }
};
// await Movie.create(
//   { user: user._id },
//   { $pull: { watchLater: id }, $addToSet: { watched: id } },
//   { new: true }
// )
const addWatched = (() => {
  var _ref = _asyncToGenerator(function* (_, { id }, { user }) {
    yield requireAuth(user);
    yield _movie2.default.create({ user: user.id, watched: id });
    return id;
  });

  return function addWatched(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

const addWatchLater = (() => {
  var _ref2 = _asyncToGenerator(function* (_, { id }, { user }) {
    yield requireAuth(user);
    yield _movie2.default.create({ user: user._id }, { watchLater: id }, { new: true });
    return id;
  });

  return function addWatchLater(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

const removeWatched = (() => {
  var _ref3 = _asyncToGenerator(function* (_, { id }, { user }) {
    yield requireAuth(user);
    yield _movie2.default.update({ user: user._id }, { $pull: { watched: id } }, { new: true });
    return id;
  });

  return function removeWatched(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
})();

const removeWatchLater = (() => {
  var _ref4 = _asyncToGenerator(function* (_, { id }, { user }) {
    yield requireAuth(user);
    yield _movie2.default.update({ user: user._id }, { $pull: { watcheLater: id } }, { new: true });
    return id;
  });

  return function removeWatchLater(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
})();

const getWatched = (() => {
  var _ref5 = _asyncToGenerator(function* (_, args, { user }) {
    yield requireAuth(user);
    const res = yield _movie2.default.find({ user: user.id }).select('watched -_id');
    const watched = res.map(function (w) {
      return w.watched;
    });
    console.log(watched);
    return watched;
  });

  return function getWatched(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
})();

const getWatchLater = (() => {
  var _ref6 = _asyncToGenerator(function* (_, args, { user }) {
    yield requireAuth(user);
    return yield _movie2.default.find({ user: user._id });
  });

  return function getWatchLater(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
})();

exports.default = {
  Query: {
    getWatched,
    getWatchLater
  },
  Mutation: {
    addWatched,
    addWatchLater,
    removeWatched,
    removeWatchLater
  }
};