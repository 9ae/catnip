const express = require('express');
const router = express.Router();

const DBController =  require('../controllers/db.controller.js');

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




module.exports = router;
