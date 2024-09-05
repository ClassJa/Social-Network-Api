module.exports = {
    async getThoughts (req, res) {
        try {
            const thoughts = await User.find();
      
            const userObj = {
              user,
              headCount: await headCount(thoughts),
            };
      
            res.json(userObj);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },
    async getSingleThoughts (req, res) {
    try {
        const student = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!student) {
          return res.status(404).json({ message: 'No student with that ID' })
        }
  
        res.json({
          user,
          thought: await thought(req.params.userId),
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
        { $pull: { user: req.params.userId } },
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
        return res.status(404).json({ message: 'No such though exists' });
      }
      res.json({ message: 'Thought successfully deleted' });
    }
     catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
},
}

