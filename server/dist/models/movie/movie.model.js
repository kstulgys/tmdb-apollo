'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const movieSchema = new _mongoose.Schema({
  watched: { type: Number },
  watchLater: { type: Number },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true });

// movieSchema.virtual('id').get(function() {
//   return this._id.toString()
// })

exports.default = _mongoose2.default.model('movie', movieSchema);

// movieSchema.statics = {
// 	incFavoriteCount(tweetId) {
// 		return this.findByIdAndUpdate(
// 			tweetId,
// 			{ $inc: { favoriteCount: 1 } },
// 			{ new: true }
// 		)
// 	},
// 	decFavoriteCount(tweetId) {
// 		return this.findByIdAndUpdate(
// 			tweetId,
// 			{ $inc: { favoriteCount: -1 } },
// 			{ new: true }
// 		)
// 	}
// }