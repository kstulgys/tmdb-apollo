'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _apolloServer = require('apollo-server');

var _db = require('./db');

var _lodash = require('lodash');

var _auth = require('./utils/auth');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _user = require('./models/user/user.schema');

var _user2 = _interopRequireDefault(_user);

var _movie = require('./models/movie/movie.schema');

var _movie2 = _interopRequireDefault(_movie);

var _movie3 = require('./datasources/movie/movie.schema');

var _movie4 = _interopRequireDefault(_movie3);

var _user3 = require('./models/user/user.resolvers');

var _user4 = _interopRequireDefault(_user3);

var _movie5 = require('./models/movie/movie.resolvers');

var _movie6 = _interopRequireDefault(_movie5);

var _movie7 = require('./datasources/movie/movie.resolvers');

var _movie8 = _interopRequireDefault(_movie7);

var _movie9 = require('./datasources/movie');

var _movie10 = _interopRequireDefault(_movie9);

var _user5 = require('./mocks/user');

var _user6 = _interopRequireDefault(_user5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('dotenv').config();
const start = exports.start = (() => {
  var _ref = _asyncToGenerator(function* () {
    const rootSchema = _apolloServer.gql`
    type Query {
      _: Boolean
    }
    type Mutation {
      _: Boolean
    }
    type Subscription {
      _: Boolean
    }
  `;
    const server = new _apolloServer.ApolloServer({
      typeDefs: [rootSchema, _user2.default, _movie2.default, _movie4.default],
      resolvers: (0, _lodash.merge)({}, _user4.default, _movie6.default, _movie8.default),
      dataSources: function () {
        return {
          movieAPI: new _movie10.default()
        };
      },
      context({ req }) {
        return _asyncToGenerator(function* () {
          const user = yield (0, _auth.authenticate)(req);
          return { user };
        })();
      },

      introspection: true
    });

    yield (0, _db.connect)(_config2.default.dbUrl);
    // await createFakeUsers()
    const { url } = yield server.listen({
      port: _config2.default.port
    });

    console.log(`GQL server ready at ${url}`);
  });

  return function start() {
    return _ref.apply(this, arguments);
  };
})();

// playground: {
//   settings: {
//     'editor.reuseHeaders': true,
//     'general.betaUpdates': false,
//     'editor.theme': 'dark',
//     'request.credentials': 'omit',
//     'tracing.hideTracingResponse': true,
//   },
//   tabs: [
//     {
//       endpoint: 'http://localhost:4000',
//       name: 'tab name 1',
//       query: defaultQuery,
//     },
//   ],
// },

// const rootSchema = `
//   schema {
//     query: Query
//     mutation: Mutation
//   }
// `
// const defaultQuery = `
// # you you joy
// # you you joyyyyyy

// query {
//   getMovies {
//     title
//     id
//   }
// }`