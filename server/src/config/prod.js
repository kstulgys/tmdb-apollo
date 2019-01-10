require('dotenv').config()

export const config = {
  port: process.env.PORT,
  jwt: process.env.JWT_SECRET,
  jwtExp: '100d',
  dbUrl: process.env.MONGO_DB,
}
