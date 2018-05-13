const express = require('express');
const router = express.Router();

const DBController =  require('../controllers/db.controller.js');
const requestHandler = require('../controllers/requestHandlers');

//Takes an address and returns the list of kitties owned by the user
router.route('/api/getKittyList').get(requestHandler.handleGetKittyList);

//pass address, kittyID, breeding/siring, price, listed
router.route('/api/updateKittyListing').post(requestHandler.handleUpdateKittyListing);

//takes a kittyID returns list of kitties that will show up
router.route('/api/getKittiesToDisplay').post(requestHandler.handleGetKittiesToDisplay);

//yourKittyID, likedKittyID, liked/disliked
router.route('/api/voteOnKitty').post(requestHandler.handleVoteOnKitty);

//add cat NOTE: for testing
router.route('/api/addCat').post(requestHandler.addCat);


module.exports = router;
