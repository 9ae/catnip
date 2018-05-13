const request = require('request-promise-native');
const cheerio = require('cheerio');
const phantom = require('phantom');
var fs = require('fs');

const scrapeKitty = async (kittyID) => {

	const url = 'https://api.cryptokitties.co/kitties/' + kittyID;

	return request(url)
	.then((res) => {
		const jsonRes = JSON.parse(res);
		const cattributes =  {};
		jsonRes.enhanced_cattributes.forEach((cattribute) => {
				cattributes[cattribute.type] = cattribute.description; 
		})

		return {
			name: jsonRes.name ? jsonRes.name : 'Kitty #' + kittyID,
			img: jsonRes.image_url,
			username: jsonRes.owner.nickname,
			cattributes: cattributes,
			bio: jsonRes.bio,
			birthtime: jsonRes.created_atls,
			cooldown: jsonRes.status.cooldown,
			cooldownIndex: jsonRes.status.cooldownIndex
		};
	}).catch((err) => {
		console.log(err)
	});


};

module.exports = {
	scrapeKitty: scrapeKitty
};
