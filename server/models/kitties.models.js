const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  name: {
    type: String
  },
  img: {
    type: String
  },
  username: {
    type: String
  },
  owner: {
    type: [String]
  },
  cattributes: {
    type: [String],
    default: []
  },
  parents:{
    type: [Number],
    default: []
  },
  bio:{
    type: String,
    default: false
  },
  birthtime:{
    type: Number
  },
  siringwith:{
    type: Number,
    default: 0
  },
  cooldown:{
    type: Number
  },
  generation: {
    type: Number
  }
});


const Web3Schema = new mongoose.Schema({
  _id: {
    type: String
  },
  kittyid: {
    type: [Number],
    default: []
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  balance: {
    type: Number,
    default: 0
  }
});


module.exports = {
  Cat: mongoose.model('cats', CatSchema),
  Web3: mongoose.model('web3', Web3Schema)
};
