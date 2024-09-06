// const { Schema, Types } = require('mongoose');
const { Schema, model } = require('mongoose');
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
      default: 'No thoughts yet',
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

const Thought = model('thoughts', thoughtsSchema)

module.exports = Thought;
