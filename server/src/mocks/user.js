import User from '../models/user/user.model'
import Movie from '../models/movie/movie.model'

import faker from 'faker'

const USERS_TOTAL = 10
const MOVIE_IDS = [
  568129,
  568139,
  568138,
  568137,
  568136,
  568135,
  568134,
  568133,
  568132,
  568131,
  568130,
  568128,
  568127,
  568126,
  568125,
  568124,
  568123,
  568121,
  568120,
  568119
]

const generateWatched = () => {
  const n = Math.floor(Math.random() * 16)
  const diff = MOVIE_IDS.sort(function() {
    return 0.5 - Math.random()
  })
  return diff.slice(1, n)
}

export default async () => {
  try {
    await User.deleteMany()

    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const watchedMovieIds = await generateWatched()
      const fakeEmail = await faker.internet.email()

      const user = await User.create({
        email: fakeEmail
      })
      await watchedMovieIds.forEach(async id => {
        await Movie.create(
          { user: user._id },
          { $pull: { watchLater: id }, $addToSet: { watched: id } },
          { new: true }
        )
      })
    })
  } catch (error) {
    throw error
  }
}
