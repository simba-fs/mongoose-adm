const formatter = require('./configFormatter');

module.exports = function restful(config){
	// format the config
	config = formatter(config);
	if(!config.index) throw new Error('index is not signed');

	const router = require('express').Router();
	// console.log(config);

	router.all('/', (req, res, next) => {
		return res.json(config.RWConfig);
	});

	router.get('/:id', async (req, res, next) => {
		let data = await config.model.find({
			[config.index]: req.params.id
		});

		let processedData = data.map(item => {
			let data = {};
			let RWConfig = config.RWConfig;
			for(let i in RWConfig){
				console.log({i, read: RWConfig[i].read})
				if(RWConfig[i].read) data[i] = item[i];
			}
			return data;
		})

		return res.json(processedData);
	});
	
	return router;
}
