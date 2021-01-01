const debug = require('debug')('restful');

/**
 *	filters
 *	@param {Array} data
 *	@param {Object} filter
 */
module.exports = function filter(data, filter){
	if(data.length === 0) return data;
	debug('filt.data', data);
	debug('filt.filter', filter);

	[data, filter] = slice(data, filter);
	[data, filter] = paginate(data, filter);
	[data, filter] = sort(data, filter);


	return data;
}


/**
 *	slice
 *	@param {Array} data
 *	@param {Object} filter
 */
function slice(data, filter){
	let start = filter._start || 0;
	let end = filter._end || data.length;

	data = data.slice(start, end);

	return [data, filter];
}

/**
 *	paginate
 *	@param {Array} data
 *	@param {Object} filter
 */
function paginate(data, filter){
	if(!filter._limit) return [data, filter];
	let limit = filter._limit;
	let page = filter._page || 1;

	data = data.slice(limit*(page-1), limit*page)
	return [data, filter];
}

/**
 *	sort
 *	@param {Array} data
 *	@param {Object} filter
 */
function sort(data, filter){
	if(!filter._sort) return [data, filter];
	let sortBy = filter._sort;
	let order = filter._order === 'false' ? false : true	// true	-> ascending, false -> desending

	if(data[0][sortBy] === undefined) return [data, filter];

	function compare(a, b){
		if(a[sortBy] > b[sortBy]) return 1;
		else if(a[sortBy] < b[sortBy]) return -1;
		else return 0;
	}


	if(order){
		data.sort(compare);
	}else{
		data.sort((a, b) =>  -compare(a, b));
	}

	return [data, filter];
}

	
