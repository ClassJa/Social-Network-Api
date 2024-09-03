const router = require('express').Router();

const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
  } = require('../../controllers/thoughtsController.js');
  

  router.route('/').get(getThoughts).post(createThoughts);


  router
  .route('/:courseId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);


module.exports = router;