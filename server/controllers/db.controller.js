const Cat = require('../models/kitties.models').Cat;
const Web3 = require('../models/kitties.models').Web3;
const mongoose = require('mongoose');
const scraper = require('../scraper');
const mockID = 748523;

/**
FUNCTIONALITIES:
    AddCat
    Cat Update (automatically upon login by user)
    Change Siring with
    Update balance
    add Cat to user (web3 schema)


*/

/**

*/
function addCat(req, res) {
  console.log('adding a kitty to the database!');

  const data = {
    name: req.body.name || null,
    img: req.body.img || null,
    _id: req.body.kittyid || null,
    username: req.body.username || null,
    owner: req.body.owner || null,
    cattributes: req.body.cattributes || null,
    parents: req.body.parents || null,
    bio: req.body.bio || null,
    birthtime: req.body.birthtime || null,
    siringwith: req.body.siringwith || null,
    cooldown: req.body.cooldown || null,
    generation: req.body.generation || null
  }

  const newCat = new Cat(data);
  newCat.save()
  .then(cat => console.log(cat))
  .catch((err) => {res.status(401).send({error: err})});
}

function scrapeKittyAndUpdate(req, res) {
  console.log('updating kitty information from the scraper!');

  const id = req.body.id;
  const data = {
    name: req.body.name || null,
    img: req.body.img || null,
    username: req.body.username || null,
    cattributes: req.body.cattributes || null,
    parents: req.body.parents || null,
    bio: req.body.bio || null,
    birthtime: req.body.birthtime || null
  }

  Cat.findByIdAndUpdate(id, data)
  .then(cat => console.log(cat))
  .catch((err) => {res.status(401).send({error: err})});

}

function updateSiring(req, res) {
  console.log('updating cat data!');

  const id = req.body.kittyid;
  const data = {
    siringwith: req.body.siringwith || null
  }

  Cat.findByIdAndUpdate(id, data)
  .then(cat => console.log(cat))
  .catch((err) => {res.status(401).send({error: err})});
}


function addAddress(req, res) {
  console.log('Adding an address!');


  const data = {
    _id: req.body.address,
    balance: req.body.balance || null,
    kittyid: req.body.kittyid || null
  }

  const newAddress = new Web3(data);
  newAddress.save()
  .then(address => console.log(address))
  .catch((err) => {res.status(401).send({error: err})});
}


function updateBalance(req, res){
  console.log('updating the balance of the user!');

  const address = req.body.address;
  //can be negative / positive. Gets added to the current balance
  const payout = parseInt(req.body.payout);

  Web3.findByIdAndUpdate(address, {$inc: {balance: payout}})
  .then(user => console.log(user))
  .catch((err) => {res.status(401).send({error: err})});

}


module.exports =  {
  addCat: addCat,
  scrapeKittyAndUpdate: scrapeKittyAndUpdate,
  updateBalance: updateBalance,
  updateSiring: updateSiring,
  addAddress: addAddress
}
