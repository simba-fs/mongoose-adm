function get(config){
	return async function get(req, res, next){
		let data = await config.model.find({
			[config.index]: req.params.id
		});

		let processedData = data.map(item => {
			let data = {};
			let RWConfig = config.RWConfig;
			for(let i in RWConfig){
				if(RWConfig[i].read) data[i] = item[i];
			}
			return data;
		})

		return res.json(processedData);

	}
}

module.exports = get;
