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

//Takes an address and returns the list of kitties owned by the user
router.route('/api/getKittyList').get();

//pass address, kittyID, breeding/siring, price, listed
router.route('/api/updateKittyListing').post()

//takes a kittyID returns list of kitties that will show up
router.route('/api/getKittiesToDisplay').get()

//yourKittyID, likedKittyID, liked/disliked
router.route('/api/voteOnKitty')




module.exports = router;
