const dbController = require('./db.controller');
const request = require('request-promise-native');
const Cat = require('../models/kitties.models').Cat;
const scraper = require('./scraper').scrapeKitty;
const ObjectId = require('mongoose').Types.ObjectId;

const addCat = (kittyID, address) => {
	console.log('adding cat = ' + kittyID);

	return Promise.all([scraper(kittyID, address), Cat.findById(kittyID)])
	.then((res) => {

	  const scrapeData = res[0];
	  const catInDB = res[1];

	  const data = {
	    name: scrapeData.name || null,
	    img: scrapeData.img || null,
	    _id: kittyID || null,
	    username: scrapeData.username || null,
	    owner: address || null,
	    cattributes: scrapeData.cattributes+ '' || null,
	    matron: scrapeData.matron || null,
	    sire: scrapeData.sire || null,
	    bio: scrapeData.bio || null,
	    birthtime: scrapeData.birthtime || null,
	    siringwith: scrapeData.siringwith || null,
	    cooldown: scrapeData.cooldown || null,
	    cooldownindex: scrapeData.cooldownindex || null,
	    generation: scrapeData.generation || null,
	    price: catInDB ? catInDB.price : 0,
	    siring: catInDB ? catInDB.siring : false,
	    liked: catInDB ? catInDB.liked : [],
	    disliked: catInDB ? catInDB.disliked : []
	  }

	  const newCat = new Cat(data);

	  if(catInDB){
	  	newCat.isNew = false;
	  } else{
	  	newCat.isNew = true;
	  }

	  return newCat.save()
	})
  .catch((err) => {console.log(err)});
}


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

			return Promise.all(kitties.map(kitty => addCat(kitty.id, address)))
				.then((cats) => {
					return cats.map(cat => ({
						name: cat.name,
						id: cat._id,
						img: cat.img,
						listed: cat.listed,
						siring: cat.siring,
						price: cat.price, 
						liked: cat.liked, 
						disliked: cat.disliked
					}));
				})
				.then((cats) => {
					res.json(cats);
				}).catch((err) => {
	    			console.log(err)
	    			res.status(401).send({error: err});
	    		});
		});
};

const handleUpdateKittyListing = (req, res) => {

	Cat.findByIdAndUpdate(req.body.kittyID, {
		siring: req.body.siring,
		price: req.body.price,
	})
	.then((cat) => {res.json(cat)})
	.catch((err) => {res.status(401).send({error: err})});

}

const handleGetKittiesToDisplay = (req, res) => {
    const me = req.query.kittyID;

    Cat.findById(me)
        .then(cat => {
            let disliked = [];
            disliked = cat.disliked;
            disliked.push(me);
            disliked.concat(cat.liked);
            console.log('jaja' + JSON.stringify(disliked))
            Cat.find({
                    _id: {
                        $nin: disliked
                    }
                })
                .limit(20)
                .exec()
                .then(catList => res.json(catList))
                .catch((err) => {
                    res.status(401).send({
                        error: err
                    })
                });
        })
        .catch((err) => {
        	console.log(err);
            res.status(401).send({
                error: err
            })
        });
}

const handleVoteOnKitty = (req, res) => {
		console.log('voting!');
	  const me = req.body.kittyID;
	  const mate = req.body.likedKittyID;
	  const vote = parseInt(req.body.vote) > 0 ? 'liked' : 'disliked';
		if (vote == 'liked') {
			Cat.findByIdAndUpdate(me, {$push: {liked: mate}})
			.then(cat => {
				console.log(cat);
				return Cat.update({_id: mate, liked: {$in: {me}}}, {$push: {matched: me}});
			})
			.then(cat => {
				if (cat.nModified != 0) {
					Cat.findByIdAndUpdate(me, {$push: {matched: mate}})
					res.json({'match': mate});
				}
			})
			.catch((err) => {res.status(401).send({error: err})});
		} else {
			Cat.findByIdAndUpdate(me, {$push:{disliked: mate}})
			.then(cat => console.log(cat))
			.catch((err) => {res.status(401).send({error: err})});
		}
}



module.exports = {
	handleGetKittyList : handleGetKittyList,
	handleUpdateKittyListing: handleUpdateKittyListing,
	handleGetKittiesToDisplay : handleGetKittiesToDisplay,
	handleVoteOnKitty : handleVoteOnKitty,
	addCat: addCat
};
