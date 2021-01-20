const debug = require('debug')('restful');
const filter = require('./filter');

const error = (e) => {
	debug(e);
	// res.locals.error = e.message;
	// res.status(400);
}

module.exports = (Model, name) => {
	const router = require('express').Router();
	function get(req, res, next){
		if(Object.keys(res.locals.query).length === 0) return next();
		let id = res.locals.query.id;

		debug('res.locals', res.locals);

		Model.find(res.locals.query)
			.then(data => {
				data = filter(id ? data[0] : data, res.locals.filter);
				res.locals.data = data;
				res.status(200);
				return data;
			})
			.catch(error)
			.finally(next);
	}

	function post(req, res, next){
		let data = req.data;

		Model.create(res.locals.query, data)
			.then(data => {
				res.locals.data = data;
				res.status(200);
			})
			.catch(error)
			.finally(next);
	}

	function put(req, res, next){
		let data = req.data;

		Model.updateOne(res.locals.query, data)
			.then(data => {
				res.locals.data = data;
				res.status(200);
			})
			.catch(error)
			.finally(next);
	}

	function remove(req, res, next){
		let data = req.data;

		Model.deleteOne(res.locals.query, data)
			.then(data => {
				res.locals.data = data;
				res.status(200);
			})
			.catch(error)
			.finally(next);
	}

	router.route('/')
		.get(get)
		.post(post)
		.put(put)
		.delete(remove);

	return router;
};
