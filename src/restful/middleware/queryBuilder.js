const debug = require('debug')('restful')

module.exports = (req, res, next) => {
	let query = {};

	// get id from pathname
	let path = req._parsedUrl.pathname.slice(1);
	path ? query.id = path : null;

	// get other filter from query
	debug('query', req.query);
	let attr = {};
	for(let i in req.query){
		if(i[0] !== '$') attr[i] = req.query[i];
	}
	debug('attr', attr);
	query = {...query, ...attr};

	res.locals.query = query;

	debug('query', res.locals.query);

	next();
};
