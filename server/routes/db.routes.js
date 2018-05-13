const express = require('express');
const router = express.Router();

const DBController =  require('../controllers/db.controller.js');
const requestHandler = require('../controllers/requestHandlers'); 

// get the cat
router.route('/api/getCat').get(DBController.getCat);

// get the user
router.route('/api/getUser').get(DBController.getAddress);

// add a cat
router.route('/api/addCat').post(DBController.addCat);

//update a user balance
router.route('/api/updateBalance').post(DBController.updateBalance);

//update a cat's status as siring / not
router.route('/api/updateSiring').post(DBController.updateSiring);

//add an address( public key), a kitty id and a balance to db
router.route('/api/addAddress').post(DBController.addAddress);

//Takes an address and returns the list of kitties owned by the user
router.route('/api/getKittyList').get(requestHandler.handleGetKittyList);

//pass address, kittyID, breeding/siring, price, listed
router.route('/api/updateKittyListing').post(requestHandler.handleUpdateKittyListing);

//takes a kittyID returns list of kitties that will show up
router.route('/api/getKittiesToDisplay').get(requestHandler.handleGetKittiesToDisplay);

//yourKittyID, likedKittyID, liked/disliked
router.route('/api/voteOnKitty').post(requestHandler.handleVoteOnKitty);


module.exports = router;
