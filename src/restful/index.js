const formatter = require('./util/configFormatter');
const queryNormalization = require('./util/queryNormalization');

const queryBuilder = require('./middleware/queryBuilder.js');

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

	const method = require('./middleware/index.js')(config.model);

	router.use('/', queryBuilder);
	router.use('/:id', setID, method, send);
	router.use('/', method, send);

	router.all('/', (req, res, next) => {
		res.json(config.RWConfig);
	});

	return router;
}
