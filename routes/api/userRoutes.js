const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
//   addUser,
//   removeUser,
} = require('../../controllers/userControllers');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

module.exports = router;
