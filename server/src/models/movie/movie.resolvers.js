import Movie from './movie.model'

import { AuthenticationError } from 'apollo-server'
// import { newApiKey } from '../../utils/auth'

const requireAuth = user => {
  if (!user) {
    throw new AuthenticationError()
  }
}
// await Movie.create(
//   { user: user._id },
//   { $pull: { watchLater: id }, $addToSet: { watched: id } },
//   { new: true }
// )
const addWatched = async (_, { id }, { user }) => {
  await requireAuth(user)
  await Movie.create({ user: user.id, watched: id })
  return id
}

const addWatchLater = async (_, { id }, { user }) => {
  await requireAuth(user)
  await Movie.create({ user: user._id }, { watchLater: id }, { new: true })
  return id
}

const removeWatched = async (_, { id }, { user }) => {
  await requireAuth(user)
  await Movie.update(
    { user: user._id },
    { $pull: { watched: id } },
    { new: true }
  )
  return id
}

const removeWatchLater = async (_, { id }, { user }) => {
  await requireAuth(user)
  await Movie.update(
    { user: user._id },
    { $pull: { watcheLater: id } },
    { new: true }
  )
  return id
}

const getWatched = async (_, args, { user }) => {
  await requireAuth(user)
  const res = await Movie.find({ user: user.id }).select('watched -_id')
  const watched = res.map(w => w.watched)
  console.log(watched)
  return watched
}

const getWatchLater = async (_, args, { user }) => {
  await requireAuth(user)
  return await Movie.find({ user: user._id })
}

export default {
  Query: {
    getWatched,
    getWatchLater
  },
  Mutation: {
    addWatched,
    addWatchLater,
    removeWatched,
    removeWatchLater
  }
}
