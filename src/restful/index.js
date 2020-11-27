const formatter = require('./configFormatter');
const queryNormalization = require('./queryNormalization');

module.exports = function restful(config){
	// format the config
	config = formatter(config);
	if(!config.index) throw new Error('index is not signed');

	const router = require('express').Router();

	router.all('/', (req, res, next) => {
		if(req.query || req.body) return next();
		else return res.json(config.RWConfig);
	});

	router.get('/:id', require('./method/get')(config));
	router.post('/:id', require('./method/post')(config));
	router.put('/:id', require('./method/put')(config));
	router.delete('/:id', require('./method/delete')(config));
	
	return router;
}
