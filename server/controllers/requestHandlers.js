const dbController = require('./db.controller');

const handleGetKittyList = (req, res) => {

};

const handleUpdateKittyListing = (req, res) => {


};

const handleGetKittiesToDisplay = (req, res) => {
	  const me = req.body.id;
	  Cat.findById(me)
	  .then(cat => {
	    const disliked = cat.disliked;
	    disliked.push(me);
			disliked.push(cat.liked);
	    Cat.find({_id: {$not : {$in : disliked}}})
	    .limit(20)
	    .then(catList => res.json(catList))
	    .catch((err) => {res.status(401).send({error: err})});
	  })
	  .catch((err) => {res.status(401).send({error: err})});
};

const handleVoteOnKitty = (req, res) => {
	  const me = req.body.idme;
	  const mate = req.body.idmate;
	  const vote = parseInt(req.body.vote) > 0 ? 'liked' : 'disliked';

	  Cat.findByIdAndUpdate(me, {vote: mate})
};


module.exports = {
	handleGetKittyList : handleGetKittyList,
	handleUpdateKittyListing: handleUpdateKittyListing,
	handleGetKittiesToDisplay : handleGetKittiesToDisplay,
	handleVoteOnKitty : handleVoteOnKitty
};
