'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paginate = require('../../utils/paginate');

var _user = require('../../models/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const pageNum = 1
// const pageSize = 20
// const currentYear = new Date().getFullYear()

// const watchedBy = async (listMovie, args) => {
//   return await User.find({ watched: { $in: [listMovie.id] } })
//     .lean()
//     .exec()
// }

// const infiniteScrollMovies = async (_, { offset = 0, limit = 20 }, { dataSources }) => {
//   let allMovies = await dataSources.movieAPI.getAllMovies()
//   const { movies, hasMore, newOffset } = paginateResults(allMovies, offset, limit)
//   return {
//     movies,
//     hasMore,
//     newOffset,
//   }
// }

const watchedBy = (() => {
  var _ref = _asyncToGenerator(function* (movie, args) {
    return yield _user2.default.find({ watched: { $in: [movie.id] } });
  });

  return function watchedBy(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
const getMoviesById = (() => {
  var _ref2 = _asyncToGenerator(function* (_, { ids }, { dataSources }) {
    return yield dataSources.movieAPI.getMoviesById(ids);
  });

  return function getMoviesById(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

const getMovies = (() => {
  var _ref3 = _asyncToGenerator(function* (_, { sort_by, page }, { dataSources }) {
    return yield dataSources.movieAPI.getMovies(sort_by, page);
  });

  return function getMovies(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})();
const getGenres = (() => {
  var _ref4 = _asyncToGenerator(function* (_, args, { dataSources }) {
    return yield dataSources.movieAPI.getGenres();
  });

  return function getGenres(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
})();

exports.default = {
  Query: {
    getGenres,
    getMovies,
    getMoviesById
  },
  Movie: {
    watchedBy
  }

  //   listMoviesWithParameters: async (
  //     _,
  //     {
  //       input: {
  //         genreId = 18,
  //         yearMin = currentYear - 3,
  //         yearMax = currentYear,
  //         ratingMin = 7,
  //         ratingMax = 10,
  //         runtimeMin = 100,
  //         runtimeMax = 180,
  //         pageNum = 1,
  //         pageSize = 5,
  //       },
  //     },
  //     { dataSources },
  //   ) => {
  //     console.log('Im in genreId listMoviesWithParameters', genreId)
  //     const allMovies = await dataSources.movieAPI.getMoviesWithParameters(
  //       genreId,
  //       yearMin,
  //       yearMax,
  //       ratingMin,
  //       ratingMax,
  //       runtimeMin,
  //       runtimeMax,
  //     )
  //     console.log(allMovies)
  //     const { movies, hasMore } = paginateResults(allMovies, pageNum, pageSize)
  //     return {
  //       movies,
  //       hasMore,
  //     }
  //   },

};