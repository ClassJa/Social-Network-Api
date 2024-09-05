const { Schema, model } = require('mongoose');
const thoughtsSchema = require('../models/thoughts');

// Schema to create User model
const userSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [thoughtsSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
