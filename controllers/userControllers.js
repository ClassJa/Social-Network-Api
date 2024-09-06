const { ObjectId } = require('mongoose').Types;
const User = require('../models/User');

// Aggregate function to get the number of users overall

module.exports = {
  // Get all users
  async getUser(req, res) {
    try {
      const user = await User.find();
      res.json(user)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// update a user
  async updateUser(req, res) {
    try {
  const user = await User.findOneAndUpdate(
    { users: req.params.userId },
    { $pull: { users: req.params.userId } },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      message: 'No user found',
    });
  }

  res.json({ message: 'User successfully updated' });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
},

  // Delete a user 
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

 
  // Add an thought to a user
  async addFriend(req, res) {
    console.log('You are adding an thought');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove thought from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json({message: "Friend removed!"});
    //   res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
