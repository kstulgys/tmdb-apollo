export const paginateResults = (allMovies, offset, limit) => {
  let movies
  let newOffset = null
  if (offset === 0) {
    movies = allMovies.slice(0, limit)
  } else {
    movies = allMovies.slice(offset, limit + offset)
  }
  const hasMore = allMovies.length > limit + offset
  if (hasMore) {
    newOffset = offset + limit
  }
  return {
    movies,
    hasMore,
    newOffset,
  }
}
