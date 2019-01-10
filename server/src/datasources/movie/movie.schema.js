import { gql } from 'apollo-server'

export default gql`
  type Movie {
    vote_count: Int
    id: ID
    genre_ids: [ID]
    image_url: String
    title: String
    vote_average: String
    release_date: String
    watchedBy: [User]!
  }

  type MoviesPage {
    movies: [Movie]!
    hasMore: Boolean
    newOffset: Int
  }

  input MovieInput {
    genreId: Int
    yearMin: Int
    yearMax: Int
    ratingMin: Int
    ratingMax: Int
    runtimeMin: Int
    runtimeMax: Int
    pageNum: Int
    pageSize: Int
  }

  type Genre {
    id: ID
    name: String
  }

  extend type Query {
    # listMoviesWithParameters(input: MovieInput): MoviesPage
    getGenres: [Genre]!
    getMoviesById(ids: [ID]): [Movie]!
    getMovies(sort_by: String, page: Int): [Movie]!
    # infiniteScrollMovies(offset: Int, limit: Int): MoviesPage
  }
`
