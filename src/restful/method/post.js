function post(config){
	return async function post(req, res, next){
		let data = await config.model.find({
			[config.index]: req.params.id
		});

	}
}

module.exports = post;
