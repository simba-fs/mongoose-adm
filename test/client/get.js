const axios = require('axios');
axios.get('http://localhost:3000')
	.then(e => console.log(e.data), console.error);
