'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloDatasourceRest = require('apollo-datasource-rest');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import MovieList from './../../../../client/src/components/movie/index'

class MoviesAPI extends _apolloDatasourceRest.RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  // add api params to each request
  // e.g. BASE_URL/movie/1/credits?api_key=4u859034&include_adult=false
  willSendRequest(request) {
    request.params.set('api_key', process.env.TMDB_API_KEY);
    request.params.set('include_adult', false);
  }

  getGenres() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const { genres } = yield _this.get(`/genre/movie/list`);
      return genres;
    })();
  }

  moviesReducer(movie) {
    const image_url = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
    const { vote_count, id, genre_ids, title, vote_average, release_date } = movie;
    return {
      vote_count,
      id,
      genre_ids,
      image_url,
      title,
      vote_average,
      release_date
    };
  }
  getMovies(sort_by = 'POPULARITY', page = 1) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (sort_by === 'POPULARITY') sort_by = 'popularity.asc';else if (sort_by === 'RELEASE_DATE') sort_by = 'release_date.desc';

      const { results = [] } = yield _this2.get('/discover/movie', {
        page,
        sort_by
      });
      return yield results.map(_this2.moviesReducer);
    })();
  }

  getMoviesById(ids) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const res = ids.map(function (id) {
        return _this3.get(`/movie/${id}`);
      });
      return yield Promise.all(res);
    })();
  }
  //     async getMovies() {
  //     let moviesArray = [];
  //     let { total_pages, total_results } = await this.get(
  //       `/discover/movie?api_key=${
  //         process.env.TMDB_API_KEY
  //       }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false`
  //     );
  //     const pages = total_pages > 5 ? 5 : total_pages;
  //     let page = 1;
  //     while (page <= pages) {
  //       let { results } = await this.get(
  //         `/discover/movie?api_key=${
  //           process.env.TMDB_API_KEY
  //         }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`
  //       );
  //       const arrayToPush = results.map(movie => this.movieReducer(movie));
  //       moviesArray = [...moviesArray, ...arrayToPush];
  //       page++;
  //     }
  //     // console.log(moviesArray.length)
  //     return moviesArray;
  //   }

  //   async getCastByMovie(id) {
  //     const res = await this.get(`/movie/${id}/credits`)
  //     return res ? res.cast : []
  //   }

  //   getMovieById(id) {
  //     return this.get(`movie/${id}`)
  //   }
}

exports.default = MoviesAPI;

// class MovieAPI extends RESTDataSource {
//   constructor() {
//     super();
//     this.baseURL = `https://api.themoviedb.org/3`;
//   }

//   // async get20Movies(page) {
//   //   let { results } = await this.get(
//   //     `/discover/movie?api_key=${
//   //       process.env.TMDB_API_KEY
//   //     }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`,
//   //   )
//   //   return results.map(movie => this.movieReducer(movie))
//   // }

//   async getAllMovies() {
//     let moviesArray = [];
//     let { total_pages, total_results } = await this.get(
//       `/discover/movie?api_key=${
//         process.env.TMDB_API_KEY
//       }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false`
//     );
//     const pages = total_pages > 5 ? 5 : total_pages;
//     let page = 1;
//     while (page <= pages) {
//       let { results } = await this.get(
//         `/discover/movie?api_key=${
//           process.env.TMDB_API_KEY
//         }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`
//       );
//       const arrayToPush = results.map(movie => this.movieReducer(movie));
//       moviesArray = [...moviesArray, ...arrayToPush];
//       page++;
//     }
//     // console.log(moviesArray.length)
//     return moviesArray;
//   }

//   movieReducer(movie) {
//     const image_url = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
//     const {
//       vote_count,
//       id,
//       genre_ids,
//       title,
//       vote_average,
//       release_date
//     } = movie;
//     return {
//       vote_count,
//       id,
//       genre_ids,
//       image_url,
//       title,
//       vote_average,
//       release_date
//     };
//   }

//   async getAllGenres() {
//     const { genres } = await this.get(
//       `/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=en-US`
//     );
//     return genres;
//   }

//   async getMoviesWithParameters(
//     genreId,
//     yearMin,
//     yearMax,
//     ratingMin,
//     ratingMax,
//     runtimeMin,
//     runtimeMax
//   ) {
//     console.log(genreId);
//     const moviesUrl =
//       `/discover/movie?` +
//       `api_key=${process.env.TMDB_API_KEY}&` +
//       `language=en-US&sort_by=popularity.desc&` +
//       `with_genres=${genreId}&` +
//       `primary_release_date.gte=${yearMin}-01-01&` +
//       `primary_release_date.lte=${yearMax}-12-31&` +
//       `vote_average.gte=${ratingMin}&` +
//       `vote_average.lte=${ratingMax}&` +
//       `with_runtime.gte=${runtimeMin}&` +
//       `with_runtime.lte=${runtimeMax}&` +
//       `page=1`;
//     const { results } = await this.get(moviesUrl);
//     return results;
//   }

//   async findMoviesById(ids) {
//     // console.log('ids in fmbid:', ids)
//     const res = ids.map(id => {
//       return this.get(`/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
//     });
//     return await Promise.all(res);
//   }
// }