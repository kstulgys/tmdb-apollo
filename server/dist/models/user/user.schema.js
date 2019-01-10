'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServer = require('apollo-server');

exports.default = _apolloServer.gql`
  type User {
    id: ID!
    email: String!
    avatar: String!
  }

  extend type Query {
    me: User
    listUsers: [User]!
  }

  extend type Mutation {
    login(email: String): String
  }
`;