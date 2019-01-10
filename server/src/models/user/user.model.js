import mongoose, { Schema } from 'mongoose'
import { hashSync, compareSync } from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String },
    password: String,
    avatar: { type: String },
    about: { type: String }
  },
  { timestamps: true, strict: true }
)

userSchema.virtual('id').get(function() {
  return this._id.toString()
})

userSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.avatar = `https://api.adorable.io/avatars/285/${this.email}.io.png`
    return next()
  }
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password)
    return next()
  }
  return next()
})

userSchema.methods = {
  _hashPassword(password) {
    return hashSync(password)
  },
  authenticateUser(password) {
    return compareSync(password, this.password)
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      process.env.JWT_SECRET
    )
  }
}

export default mongoose.model('user', userSchema)
