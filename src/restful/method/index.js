const debug = require('debug')('restful');

const error = (e) => {
	debug(e);
	res.locals.error = e.message;
	res.status(400);
}

module.exports = (Model, name) => {
	const router = require('express').Router();

	function get(req, res, next){
		let id = res.locals.id;
		let query = id ? { id } : {};
		console.log({id, query});

		Model.find(query)
			.then(data => {
				res.locals.data = id ? data[0] : data;
				res.status(200);
			})
			.catch(error)
			.finally(next);
	}

	function post(req, res, next){
		let id = res.locals.id;
		let data = req.data;

		if(!id) {
			error(new Error('id is undefined'));
			return next();
		}

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

		if(!id) {
			error(new Error('id is undefined'));
			return next();
		}
		
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

		if(!id) {
			error(new Error('id is undefined'));
			return next();
		}
		
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
