import { gql } from "apollo-server"

export default gql`
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
`
