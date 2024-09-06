const { ObjectId } = require('mongoose').Types;
const Thought = require('../models/thoughts');
const Reactions = require('../models/reactions');

const headCount = async () => {
    const numberOfThoughts = await Thought.aggregate()
      .count('thoughtCount');
    return numberOfThoughts;
  }

module.exports = {
    async getThoughts (req, res) {
        try {
            // how to link the user to thoughts?
            const thoughts = await Thought.find();
      
            const thoughtObj = {
              user,
              thoughts,
              headCount: await headCount(thoughts),
            };
      
            res.json(thoughtObj);
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
  
        res.json({
          user,
          thought: await thought(req.params.thoughtId),
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    async createThoughts (req, res) {
        try {
          const thought = await Thought.create(req.body);
          res.json(thought);
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
    async deleteThoughts (req, res) {
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
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

