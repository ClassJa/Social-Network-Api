const { ObjectId } = require('mongoose').Types;
const Thought = require('../models/Thought')
const User = require('../models/User')


module.exports = {
    async getThoughts (req, res) {
        try {
            // how to link the user to thoughts?
            const thoughts = await Thought.find();
            res.json(thoughts);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },
    async getSingleThoughts (req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' })
        }
  
        res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    async createThoughts (req, res) {
        try {
          const thought = await Thought.create(req.body);
          const userThoughtAdded = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id} },
            { new: true }
          )
          if (!userThoughtAdded) {
            res.status(404)
          }
          res.json({ message: "Thought added for this user"});
        } catch (err) {

          res.status(500).json(err);
        }
      },

    async updateThoughts (req, res) {
        try {
        const thought = await Thought.findOneAndUpdate(
        { thought: req.params.thoughtId },
        { $pull: { thought: req.params.thoughtId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'Thought not found',
        });
      }

      res.json({ message: 'Thought successfully updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
},

    async createReaction (req, res) {
        try {
            const reaction = await Thought.create(req.body);
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThoughts (req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }
      res.json({ message: 'Thought successfully deleted' });
    }
     catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
},
}
