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

module.exports = function configForamtter(config){
	// RWConfig
	config.RWConfig = formatRWConfig(config.RWConfig || {});

	return config;
}
