const debug = require('debug')('restful');

module.exports = function filter(data, filter){
	debug('filt.data', data);
	debug('filt.filter', filter);

	// pagination
	[data, filter] = paginate(data, filter);
	debug('paginate.data-3', data.length);


	return data;
}

function paginate(data, filter){
	if(!filter._limit) return [data, filter];
	let limit = filter._limit;
	let page = filter._page || 1;

	debug('paginate.data-1', data.length)
	data = data.slice(limit*(page-1), limit*page)
	debug('paginate.data-2', data.length)
	return [data, filter];
}
