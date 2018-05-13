const dbController = require('./db.controller');
const request = require('request-promise-native');
const Cat = require('../models/kitties.models').Cat;


const handleGetKittyList = (req, res) => {
	console.log('handling get kitty');
	const address = req.query.address;
	const getKittiesURL = 'https://api.cryptokitties.co/kitties?owner_wallet_address=';

	request(getKittiesURL + address)
		.then((r) => {
			const res = JSON.parse(r); 
			console.log(res); 
			const kitties = res.kitties.map((kitty) => {
				return {
					name: kitty.name ? kitty.name : 'Kitty #' + kitty.id,
					id: kitty.id
				};
			});

			const updateKitty = (kitty) => {
				return Cat.findById(kitty.id).then((cat) => {

					console.log('getting kitty'); 

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
			.then((res) => {
				console.log(res); 
			})
			.catch((err) => {
				console.log(err); 
			}); 
		})

}

const handleUpdateKittyListing = (req, res) => {


}

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
}

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
}


module.exports = {
	handleGetKittyList : handleGetKittyList,
	handleUpdateKittyListing: handleUpdateKittyListing,
	handleGetKittiesToDisplay : handleGetKittiesToDisplay,
	handleVoteOnKitty : handleVoteOnKitty
};
