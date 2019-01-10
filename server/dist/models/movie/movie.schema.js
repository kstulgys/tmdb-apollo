"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServer = require("apollo-server");

exports.default = _apolloServer.gql`
  extend type Query {
    getWatched: [ID]!
    getWatchLater: [ID]!
  }

  extend type Mutation {
    addWatched(id: Int): Int!
    addWatchLater(id: Int): Int!
    removeWatched(id: Int): Int!
    removeWatchLater(id: Int): Int!
  }
`;