function get(config){
	return async function get(req, res, next){
		let data = await config.model.find({
			[config.index]: req.params.id
		});
	}
}

module.exports = get;

