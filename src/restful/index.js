const debug = require('debug')('restful');
const formatter = require('./util/configFormatter');
const queryNormalization = require('./util/queryNormalization');

const queryBuilder = require('./middleware/queryBuilder.js');

const setID = (req, res, next) => {
	res.locals.id = req.params.id;
	next();
};

const send = (req, res, next) => {
	if(Object.keys(res.locals.data).length !== 0){
		res.json(res.locals.data);
	}else{
		next();
	}
}

const defaultdata = (req, res, next) => {
	res.locals.data = {};
	next();
};

module.exports = function restful(config){
	// format the config
	config = formatter(config);

	const router = require('express').Router();

	// restful methods
	const method = require('./middleware/index.js')(config.model);

	// default res.locals.data, it will be display when some error occur and mongoose can't get data
	router.use(defaultdata);

	// query builder, including id, attr in an query object
	router.use(queryBuilder(config));

	// for the format of request, those with id in pathname and those without
	router.use('/:id', method, send);
	router.use('/', method, send);
	router.use((req, res, next) => {
		debug('-->>> here!');
		next();
	})

	// if nothing is match, do this
	router.all('*', (req, res, next) => {
		debug('!! --->> here')
		res.json(config.RWConfig);
	});

	return router;
}
