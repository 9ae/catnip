const express = require('express');
const router = express.Router();

const DBController =  require('../controllers/db.controller.js');

// Get all questions
router.route('/api').get(DBController.getQuestions);

// Get questions with a specific tag
router.route('/api/tag/:tag').get(DBController.filterTag);

// Get the page of a specific question
router.route('/api/get/:q').get(DBController.getQuestion);

// Post a question
router.route('/api/ask').post(DBController.postQuestion);

// Post an answer
router.route('/api/answer').post(DBController.postAnswer);

// Edit a question
router.route('/api/editQuestion').post(DBController.editQuestion);

// Edit a answer
router.route('/api/editAnswer').post(DBController.editAnswer);

// Upvote / Downvote a answer
router.route('/api/vote').post(DBController.vote);

// Filter by most upvotes
router.route('/api/hot').get(DBController.filterHottest);


module.exports = router;
