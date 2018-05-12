const dbController = require('./db.controller'); 
const request = require('request-promise-native'); 



const handleGetKittyList = (req, res) => {

	const address = req.query.address; 
	const getKittiesURL = 'https://api.cryptokitties.co/kitties?owner_wallet_address='; 

	request(getKittiesURL + address)
		.then((r) => {
			const res = JSON.parse(r); 
			const kitties = res.kitties.map((kitty) => {
				return {
					name: kitty.name ? kitty.name : 'Kitty #' + kitty.id
					id: kitty.id 
				}; 
			});

			 

		})

};

const handleUpdateKittyListing = (req, res) => {


};

const handleGetKittiesToDisplay = (req, res) => {


};

const handleVoteOnKitty = (req, res) => {


};


module.exports = {
	handleGetKittyList : handleGetKittyList, 
	handleUpdateKittyListing: handleUpdateKittyListing,
	handleGetKittiesToDisplay : handleGetKittiesToDisplay,
	handleVoteOnKitty : handleVoteOnKitty
}; 