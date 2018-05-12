const Cat = require('../models/kitties.models').Cat;
const Web3 = require('../models/kitties.models').Web3;
const mongoose = require('mongoose');
const scraper = require('./scraper').scrapeKitty;
const mockID = 748523;


          //NOTE: req.body.kittyid
function addCat(req, res) {
  console.log('adding a kitty to the database!');

  const scrapeData = scraper(id);
  scrapeData.cattributes = separate(scrapeData.cattributes);

  const data = {
    name: scrapeData.name || null,
    img: scrapeData.img || null,
    _id: req.body.kittyid || null,
    username: scrapeData.username || null,
    owner: req.body.owner || null,
    cattributes: scrapeData.cattributes || null,
    matron: scrapeData.matron || null,
    sire: scrapeData.sire || null,
    bio: scrapeData.bio || null,
    birthtime: scrapeData.birthtime || null,
    siringwith: scrapeData.siringwith || null,
    cooldown: scrapeData.cooldown || null,
    cooldownindex: scrapeData.cooldownindex || null,
    generation: scrapeData.generation || null
  }

  const newCat = new Cat(data);
  newCat.save()
  .then(cat => res.json(cat))
  .catch((err) => {res.status(401).send({error: err})});
}


function getCat(req, res) {
  console.log('getting cat data!');

  const id = req.body.kittyid;

  Cat.findById(id)
  .then(cat => res.json(cat))
  .catch((err) => {res.status(401).send({error: err})});
}



function getAddress(req,res) {
  console.log('getting the address!');

  const id = req.body.address;

  Web3.findById(id)
  .then(cat => res.json(cat))
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



function separate(arr) {
   let newArr = [];
   arr.forEach(el => {
     const obj = {};
     obj[el.slice(0,(el.indexOf('|')))]= el.slice(el.indexOf('|')+1);
     newArr.push(obj);
   });
   return newArr;
}


module.exports =  {
  addCat: addCat,
  scrapeKittyAndUpdate: scrapeKittyAndUpdate,
  updateBalance: updateBalance,
  updateSiring: updateSiring,
  addAddress: addAddress,
  getCat: getCat,
  getAddress: getAddress
}
