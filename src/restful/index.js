const formatter = require('./configFormatter');
const queryNormalization = require('./queryNormalization');

const setID = (req, res, next) => {
	res.locals.id = req.params.id;
	next();
};

const send = (req, res, next) => {
	res.json(res.locals.data);
}

module.exports = function restful(config){
	// format the config
	config = formatter(config);

	const router = require('express').Router();
	const method = require('./method')(config.model);

	router.use('/:id', setID, method, send);
	router.use('/', method, send);

	router.all('/', (req, res, next) => {
		res.json(config.RWConfig);
	});

	
	return router;
}
