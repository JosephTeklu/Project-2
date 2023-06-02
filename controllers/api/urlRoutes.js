const router = require("express").Router();
const { Url } = require("../../models");

const withAuth = require("../../utils/auth");
const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '78153fa523msh56908328bb9740dp167b5ejsn8246729d6f2a',
		'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
	},
	body: new URLSearchParams({
		url: 'https://google.com/'
	})
};
router.get('/', async (req,res) =>{
try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
});

module.exports = router;