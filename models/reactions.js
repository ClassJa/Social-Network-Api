const { Schema, model } = require('mongoose');
const userSchema = require('../models/user');
// const { options } = require('../routes');

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        max_length: 280,
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

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
