require('dotenv').config()
import { ApolloServer, gql } from 'apollo-server'
import { connect } from './db'
import { merge } from 'lodash'
import { authenticate } from './utils/auth'
import config from './config'

import userSchema from './models/user/user.schema'
import movieSchema from './models/movie/movie.schema'
import movieAPISchema from './datasources/movie/movie.schema'

import userResolvers from './models/user/user.resolvers'
import movieResolvers from './models/movie/movie.resolvers'
import movieAPIResolvers from './datasources/movie/movie.resolvers'

import MovieAPI from './datasources/movie'
import createFakeUsers from './mocks/user'

export const start = async () => {
  const rootSchema = gql`
    type Query {
      _: Boolean
    }
    type Mutation {
      _: Boolean
    }
    type Subscription {
      _: Boolean
    }
  `
  const server = new ApolloServer({
    typeDefs: [rootSchema, userSchema, movieSchema, movieAPISchema],
    resolvers: merge({}, userResolvers, movieResolvers, movieAPIResolvers),
    dataSources: () => ({
      movieAPI: new MovieAPI()
    }),
    async context({ req }) {
      const user = await authenticate(req)
      return { user }
    },

    introspection: true
  })

  await connect(config.dbUrl)
  // await createFakeUsers()
  const { url } = await server.listen({
    port: config.port
  })

  console.log(`GQL server ready at ${url}`)
}

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
