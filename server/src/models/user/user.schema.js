import { gql } from 'apollo-server'

export default gql`
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
`
