'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _movie = require('../models/movie/movie.model');

var _movie2 = _interopRequireDefault(_movie);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const USERS_TOTAL = 10;
const MOVIE_IDS = [568129, 568139, 568138, 568137, 568136, 568135, 568134, 568133, 568132, 568131, 568130, 568128, 568127, 568126, 568125, 568124, 568123, 568121, 568120, 568119];

const generateWatched = () => {
  const n = Math.floor(Math.random() * 16);
  const diff = MOVIE_IDS.sort(function () {
    return 0.5 - Math.random();
  });
  return diff.slice(1, n);
};

exports.default = _asyncToGenerator(function* () {
  try {
    yield _user2.default.deleteMany();

    yield Array.from({ length: USERS_TOTAL }).forEach((() => {
      var _ref2 = _asyncToGenerator(function* (_, i) {
        const watchedMovieIds = yield generateWatched();
        const fakeEmail = yield _faker2.default.internet.email();

        const user = yield _user2.default.create({
          email: fakeEmail
        });
        yield watchedMovieIds.forEach((() => {
          var _ref3 = _asyncToGenerator(function* (id) {
            yield _movie2.default.create({ user: user._id }, { $pull: { watchLater: id }, $addToSet: { watched: id } }, { new: true });
          });

          return function (_x3) {
            return _ref3.apply(this, arguments);
          };
        })());
      });

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    })());
  } catch (error) {
    throw error;
  }
});