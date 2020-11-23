const format = require('./configFormatter');

require('./queryNormalization')(
	{
		params: { id: '123456'},
		query: {
			title: ['test', 'another Title'],
			secret: '846473'
		}
	},
	format({
		RWConfig: {
			id: 'r',
			title: 'rw',
			author: ['r'],
			published: {
				read: true,
				write: true
			},
			publishedDate: 'r',
			content: 'rw'
		}
	})
);
