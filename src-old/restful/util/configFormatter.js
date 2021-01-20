function formatRWConfig(RWConfig){
	for(let i in RWConfig){
		let item = RWConfig[i]
		if(Array.isArray(item)){
			RWConfig[i] = {
				read: item.includes('r'),
				write: item.includes('w')
			}
		}else if(typeof item === 'string'){
			let permission = RWConfig[i].split('').sort();
			RWConfig[i] = {
				read: permission.includes('r'),
				write: permission.includes('w')
			}
		}else if(typeof item === 'number'){
			RWConfig[i] = {
				read: !!(item & 2),
				write: !!(item & 1)
			};
		}else{
			RWConfig[i] = {
				read: !!item.read,
				write: !!item.write
			};
		}
	}

	return RWConfig;
}

function formatMethod(config){
	let method = {before: {}, after: {}};

	// before
	let before = config?.method?.before;
	if(typeof before === 'function'){
		method.before.get = [before, config?.onGet].filter(i => i);
		method.before.post = [before, config?.onPost].filter(i => i);
		method.before.put = [before, config?.onPut].filter(i => i);
		method.before.delete = [before, config?.onDelete].filter(i => i);
	}else{
		method.before.get = [before?.get, config?.onGet].filter(i => i);
		method.before.post = [before?.post, config?.onPost].filter(i => i);
		method.before.put = [before?.put, config?.onPut].filter(i => i);
		method.before.delete = [before?.delete, config?.onDelete].filter(i => i);
	}

	// after
	let after = config?.method?.after;
	if(typeof after === 'function'){
		method.after.get = [after, config?.onGet].filter(i => i);
		method.after.post = [after, config?.onPost].filter(i => i);
		method.after.put = [after, config?.onPut].filter(i => i);
		method.after.delete = [after, config?.onDelete].filter(i => i);
	}else{
		method.after.get = [after?.get, config?.onGet].filter(i => i);
		method.after.post = [after?.post, config?.onPost].filter(i => i);
		method.after.put = [after?.put, config?.onPut].filter(i => i);
		method.after.delete = [after?.delete, config?.onDelete].filter(i => i);
	}
	config.method = method;

	return method;
}

module.exports = function configForamtter(config){
	// RWConfig
	config.RWConfig = formatRWConfig(config.RWConfig || {});

	// method
	config.method = formatMethod(config || {});
	return config;
}
