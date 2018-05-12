const express = require('express');
const router = express.Router();

const DBController =  require('../controllers/db.controller.js');

// Get all questions
router.route('/api/addCat').post(DBController.addCat);

//scrape kitty data from Cryptokitties.co
router.route('/api/updateCat').post(DBController.scrapeKittyAndUpdate);

//update a user balance
router.route('/api/updateBalance').post(DBController.updateBalance);

//update a cat's status as siring / not
router.route('/api/updateSiring').post(DBController.updateSiring);

//add an address( public key), a kitty id and a balance to db
router.route('/api/addAddress').post(DBController.addAddress);


module.exports = router;
