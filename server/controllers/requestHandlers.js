const dbController = require('./db.controller');
const request = require('request-promise-native');
const Cat = require('../models/kitties.models').Cat;
const scraper = require('./scraper').scrapeKitty;
const mockID = 748523;

const handleGetKittyList = (req, res) => {
	console.log('handling get kitty');
	const address = req.query.address;
	const getKittiesURL = 'https://api.cryptokitties.co/kitties?owner_wallet_address=';

	request(getKittiesURL + address)
		.then((r) => {
			const jsonResult = JSON.parse(r); 
			const kitties = jsonResult.kitties.map((kitty) => {
				return {
					name: kitty.name ? kitty.name : 'Kitty #' + kitty.id,
					id: kitty.id
				};
			});

			const updateKitty = (kitty) => {
				return Cat.findByIdAndUpdate(kitty.id).then((cat) => {
					if(cat){
						kitty.listed = cat.listed;
						kitty.siring = cat.siring;
						kitty.price = cat.price;
					}else{
						kitty.listed = false;
						kitty.siring = false;
						kitty.price = 0;
					}
					return kitty;
				});
			};

			Promise.all(kitties.map(kitty => updateKitty(kitty)))
		    .then(catList => res.json(catList))
	    	.catch((err) => {
	    		console.log(err)
	    		res.status(401).send({error: err})});

		})

};

const handleUpdateKittyListing = (req, res) => {

	console.log(req.body); 
	Cat.findByIdAndUpdate(req.body.kittyID, {
		siring: req.body.siring, 
		price: req.body.price, 
		listed: req.body.listed
	}, {upsert:true})
	.then((r) => {
		console.log(r); 
		res.status(200).send()})
	.catch((err) => {
		console.log(err)
		res.status(401).send({error: err})
	});
};

const handleGetKittiesToDisplay = (req, res) => {
	  const me = req.body.id;
	  Cat.findById(me)
	  .then(cat => {
	    const disliked = cat.disliked;
	    disliked.push(me);
			disliked.push(cat.liked);
	    Cat.find({_id: {$not : {$in : disliked}}, siringwith: 0})
	    .limit(20)
	    .then(catList => res.json(catList))
	    .catch((err) => {res.status(401).send({error: err})});
	  })
	  .catch((err) => {res.status(401).send({error: err})});
};

const handleVoteOnKitty = (req, res) => {
	  const me = req.body.myid;
	  const mate = req.body.partnerid;
	  const vote = parseInt(req.body.vote) > 0 ? 'liked' : 'disliked';
		if (vote == 'liked') {
			Cat.findByIdAndUpdate(me, {vote: mate, $push: {'matched': mate}})
			.then(cat => console.log(cat))
			.catch((err) => {res.status(401).send({error: err})});
		}
	  Cat.findByIdAndUpdate(me, {vote: mate})
		.then(cat => console.log(cat))
		.catch((err) => {res.status(401).send({error: err})});
};

const addCat = (req, res) => {
  console.log('adding a kitty to the database!');

  const scrapeData = scraper(req.body.kittyid);
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

  return newCat.save()
	.then(cat => res.json(cat))
  .catch((err) => {console.log(err)});
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

module.exports = {
	handleGetKittyList : handleGetKittyList,
	handleUpdateKittyListing: handleUpdateKittyListing,
	handleGetKittiesToDisplay : handleGetKittiesToDisplay,
	handleVoteOnKitty : handleVoteOnKitty,
	addCat: addCat
};
