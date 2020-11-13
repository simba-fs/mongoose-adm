const express = require('express');
const mongoose = require('mongoose');
const Admin = require('../');

mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Connected to DB'))
	.catch(e => console.error(e));

const app = express();

const Post = mongoose.model('post', new mongoose.Schema({
	title: String,
	author: String,
	published: Boolean,
	publishedDate: {
		type: Date,
		default: Date.now
	},
	content: String
}));

app.use('/', Admin.restful({
	model: Post,
	RWConfig: {},
	createConfig: {},
	method: {
		beforeGet: function(){},
		afterGet: function(){},
		beforePost: function(){},
		afterPost: function(){},
		beforePut: function(){},
		afterPut: function(){},
		beforeDelete: function(){},
		afterDelete: function(){}
	},
	onGet: function(){},
	onPost: function(){},
	onPut: function(){},
	onDelete: function(){},
	
}))

app.listen(3000, () => console.log('listen on port 3000'));
