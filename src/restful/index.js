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
	if(!config.index) throw new Error('index is not signed');

	const router = require('express').Router();
	const method = require('./method')(config.model);

	router.use('/:id', setID, method, send);
	// router.get('/:id', require('./method/get')(config));
	// router.post('/:id', require('./method/post')(config));
	// router.put('/:id', require('./method/put')(config));
	// router.delete('/:id', require('./method/delete')(config));

	router.all('/', (req, res, next) => {
		res.json(config.RWConfig);
	});

	
	return router;
}
