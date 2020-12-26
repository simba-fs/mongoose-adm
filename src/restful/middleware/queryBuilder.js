const debug = require('debug')('restful')

module.exports = (config) => (req, res, next) => {
	let availableAttr = Object.keys(config.model.schema.obj);

	let query = {};
	let filter = {};

	// get id from pathname
	let path = req._parsedUrl.pathname.slice(1);
	path ? query.id = path : null;

	// get other filter from query
	for(let i in req.query){
		if(i[0] !== '_' && availableAttr.includes(i)) query[i] = req.query[i];
		else filter[i] = req.query[i];
	}

	res.locals.query = query;
	res.locals.filter = filter;

	debug('query', res.locals);

	next();
};
