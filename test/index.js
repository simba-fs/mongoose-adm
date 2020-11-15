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
	// RWConfig can define which columns to be read or written. If it is not set, you cannot write and view it.
	RWConfig: {
		title: 'rw',
		author: ['r'],
		published: {
			read: true,
			write: true
		},
		publishedDate: 'r',
		content: 'rw'
	},
	// Admin page will read the column in this array to c generate a create form. If it is not define, the create form will not be generate.
	createConfig: [
		'title',
		'author',
		'published',
		'conetent'
	],
	// You can custom function for eac method. Before or after can be Object or Function. 
	method: {
		before: function(){},
		after: {
			get: function(){},
			post: function(){},
			put: function(){},
			delete: function(){}
		},
	},
	// on<method> equal to before.<method>. If both of is set, before.<method> will be execute firstk
	onGet: function(){},
	onPost: function(){},
	onPut: function(){},
	onDelete: function(){}
}));

app.listen(3000, () => console.log('listen on port 3000'));
