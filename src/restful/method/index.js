const debug = require('debug')('restful');

const error = (e) => {
	debug(e);
	res.locals.error = 'An unexpected error occurred, it may cause by mongoose or the mongo server';
	res.status(400);
}

module.exports = (Model, name) => {
	const router = require('express').Router();

	function get(req, res, next){
		let id = res.locals.id;

		Model.findOne({ id })
			.then(data => {
				res.locals.data = data;
				res.status(200);
			})
			.catch(error)
			.finally(next);
	}

	function post(req, res, next){
		let id = res.locals.id;
		let data = req.data;

		Model.create({ id }, data)
			.then(data => {
				res.locals.data = data;
				res.status(200);
			})
			.catch(error)
			.finally(next);
	}

	function put(req, res, next){
		let id = res.locals.id;
		let data = req.data;

		Model.updateOne({ id }, data)
			.then(data => {
				res.locals.data = data;
				res.status(200);
			})
			.catch(error)
			.finally(next);
	}

	function remove(req, res, next){
		let id = res.locals.id;
		let data = req.data;

		Model.deleteOne({ id }, data)
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
