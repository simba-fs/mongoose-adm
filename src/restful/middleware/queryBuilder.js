module.exports = (req, res, next) => {
	let query = {};
	
	let path = req.url.split('/').slice(1);
	let id = path[0];

	query.id = id;

	res.locals.query = query;

	next();
};
