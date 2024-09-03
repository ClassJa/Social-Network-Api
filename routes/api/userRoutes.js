const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
//   addUser,
//   removeUser,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUser).post(createUser);

// /api/students/:studentId
router.route('/:studentId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
