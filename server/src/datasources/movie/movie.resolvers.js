import { paginateResults } from '../../utils/paginate'
import User from '../../models/user/user.model'
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

const watchedBy = async (movie, args) => {
  return await User.find({ watched: { $in: [movie.id] } })
}
const getMoviesById = async (_, { ids }, { dataSources }) => {
  return await dataSources.movieAPI.getMoviesById(ids)
}

const getMovies = async (_, { sort_by, page }, { dataSources }) => {
  return await dataSources.movieAPI.getMovies(sort_by, page)
}
const getGenres = async (_, args, { dataSources }) => {
  return await dataSources.movieAPI.getGenres()
}

export default {
  Query: {
    getGenres,
    getMovies,
    getMoviesById
  },
  Movie: {
    watchedBy
  }
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
