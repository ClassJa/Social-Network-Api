// const { Schema, Types } = require('mongoose');
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtsSchema = new Schema(
  {
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

const Thought = model('Thought', thoughtsSchema)

module.exports = Thought;
