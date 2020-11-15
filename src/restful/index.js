const formatter = require('./configFormatter');

module.exports = function restful(config){
	// format the config
	config = formatter(config);

	const router = require('express').Router();

	router.get('/', (req, res, next) => {
		res.send('<h1>Hello World</h1>');
	});
	
	return router;
}
