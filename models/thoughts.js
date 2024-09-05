const { Schema, Types } = require('mongoose');
const reactionSchema = require('./reactions')

const thoughtsSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
      default: 'Unnamed thought',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
       type: String,
       required: true
    },
     reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: true,
  }
);

module.exports = thoughtsSchema;
