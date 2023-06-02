const router = require("express").Router();
const { Url } = require("../../models");

const withAuth = require("../../utils/auth");
const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': process.env.APIKEY,
		'X-RapidAPI-Host': process.env.APIHOST
	},
	body: new URLSearchParams({
		url: ''
	})
};

//add new url
router.get('/', async (req,res) =>{
try {
	const newUrl = await fetch(url, options);
	const result = await newUrl.text(req.body);
	//save url
	req.session.save(() => {
		req.session.url_id = newUrl.id;
		res.status(200).json(Url);
	});
	console.log(result);
} catch (error) {
	console.error(error);
}
});

router.post('/', async (req,res) => {
	try {
		const newUrl = await Url.create.fetch(url, options);
		
		req.session.save (() => {
			req.session.url_id = newUrl.id;
			res.status(200).json(newUrl);
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete('/', async (req,res) => {
	try{
		await Url.destroy(req.body);
		req.session.save(() => {
			res.status(200).json(e);
		})
	} catch (error) {
		res.status(500).json(error)
	}
})
module.exports = router;