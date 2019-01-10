import User from '../models/user/user.model'
const isEmail = require('isemail')

export const authenticate = async req => {
  const auth = (req.headers && req.headers.authorization) || ''
  const email = new Buffer(auth, 'base64').toString('ascii')
  if (!isEmail.validate(email)) {
    return
  }
  let user = await User.findOne({ email })
  return user
}

//? import cuid from 'cuid'

// export const newApiKey = () => {
//   return cuid()
// }

// export const authenticate = async req => {
//   const userEmail = req.headers.authorization

//   if (!userEmail) {
//     return
//   }

//   const user = await User.findOne({ apiKey })
//     .select('-password')
//     .lean()
//     .exec()

//   return user
// }
