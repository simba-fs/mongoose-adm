/*
 *	/[:id]?
 *		// fillter, with prefix '_'
 *		_pageLength=10&
 *		_page=1&
 *		_orderBy=publishDate&
 *
 *		// special demand, only checking the column with read permission
 *		author=Simba Fs&
 *		auhtor=Kenny Fs&
 *		...
 *		[key]=value&
 *
 */

/**
 *	normalize queries and generate query object for mongoose
 *	@param {Object} req - request object
 *	@param {Object} config - config object
 *	@return {Object} mongoose qruery object
 */
function queryNormalization(req, config){
	console.log({ req, config })
	const id = req.params.id;
	const query = req.query;
	const specialDemand = { id:[id] };

	for(let i in query){
		if(config.RWConfig[i]?.read){
			if(Array.isArray(query[i])){
				specialDemand[i] = query[i];
			}else{
				specialDemand[i] = [ query[i] ];
			}
		}
	}
}

module.exports = queryNormalization;
