const router = require('express').Router();

const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
  } = require('../../controllers/thoughtsController');
  

  router.route('/').get(getThoughts).post(createThoughts);


  router
  .route('/:thoughtId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);


module.exports = router;