const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');
const Thoughts = require('../models/thoughts');
const Reactions = require('../models/reactions');
// const User = require('../models/user');

// Aggregate function to get the number of users overall
const headCount = async () => {
  const numberOfUser = await User.aggregate()
    .count('userCount');
  return numberOfUser;
}


// const thoughts = async (userId) =>
//   User.aggregate([
//     // only include the given user by using $match
//     { $match: { _id: new ObjectId(thoughts) } },
//     {
//     //   $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(userId),
//         // overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);


//   var ThoughtsSchema = new Schema({
//     categories: [{ 
//       type: Schema.Types.ObjectId, 
//       ref: 'Thought' }]
//   });

// const friends = async (userId) =>
//   User.aggregate([
//     // only include the given user by using $match
//     { $match: { _id: new ObjectId(userId) } },
//     {
//     //   $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(userId),
//         // overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  async getUser(req, res) {
    try {
      const user = await User.find();

      const userObj = {
        user,
        headCount: await headCount(),
      };

      res.json(userObj);
      console.log(userObj)
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

      res.json({
        user,
        thoughts: await grade(req.params.userId),
      });
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
  async addThought(req, res) {
    console.log('You are adding an thought');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
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
  async removethought(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { assignment: { thoughtId: req.params.thoughtId } } },
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
};
