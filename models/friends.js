const { Schema, model } = require('mongoose');
const userSchema = require('../models/user');
// const { options } = require('../routes');

// Schema to create User model
// const friendSchema = new Schema(
const friendSchema = new Schema(
  {
    friendId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      username: {
      type: String,
      required: true,
      user: [userSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// module.exports = friendSchema;
const Friend = model('friend', friendSchema);

module.exports = Friend;

