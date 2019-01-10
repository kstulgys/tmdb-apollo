'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  name: { type: String },
  password: String,
  avatar: { type: String },
  about: { type: String }
}, { timestamps: true, strict: true });

userSchema.virtual('id').get(function () {
  return this._id.toString();
});

userSchema.pre('save', function (next) {
  if (this.isModified('email')) {
    this.avatar = `https://api.adorable.io/avatars/285/${this.email}.io.png`;
    return next();
  }
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

userSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenticateUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },
  createToken() {
    return _jsonwebtoken2.default.sign({
      _id: this._id
    }, process.env.JWT_SECRET);
  }
};

exports.default = _mongoose2.default.model('user', userSchema);