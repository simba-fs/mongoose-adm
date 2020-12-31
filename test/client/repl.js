#!/usr/bin/env node
const axios = require('axios');
const path = require('path');
const url = require('url');
const repl = require('repl');

class Request{
	constructor(path){
		this.path = path;
		this.initialPath = path;
		this.query = {};
		this.body = {};
	}

	/** util */
	showData(data){
		console.log(data.data);
	}

	/** query, body */
	query(name, value){
		if(value) this.query[name] = value;
		else console.log('Query \'%s\' = \'%s\'', name, this.query[name]);
		return this;
	}

	removeQuery(name){
		delete this.query[name];
		return this;
	}

	body(name, value){
		if(value) this.body[name] = value;
		else console.log('Body \'%s\' = \'%s\'', name, this.body[name]);
		return this;
	}

	removeBody(name){
		delete this.body[name];
		return this;
	}

	/** path */
	cd(_url){
		if(!_url || _url.length === 0){
			this.path = this.initialPath;
		}else if(_url === '/'){
			let parsedUrl = url.parse(this.initialPath);
			this.path = `${parsedUrl.protocol}//${parsedUrl.host}`;
		}else if(_url.startsWith('http')){
			this.path = _url;
		}else{
			this.path = path.join(this.path, _url);
			this.path = this.path.replace('/', '//');
		}
		replServer.setPrompt(`${api.path} > `);

		return this;
	}

	/** http methods */
	get(){
		axios.get(this.path, {
			params: this.query,
			data: this.body
		}).then(this.showData, this.showData);
		return this;
	}

	post(){
		axios.post(this.path, {
			params: this.query,
			data: this.body
		}).then(this.showData, this.showData);
		return this;

	}

	put(){
		axios.put(this.path, {
			params: this.query,
			data: this.body
		}).then(this.showData, this.showData);
		return this;

	}

	delete(){
		axios.delete(this.path, {
			params: this.query,
			data: this.body
		}).then(this.showData, this.showData);
		return this;

	}
}

api = new Request(process.argv[2] || 'http://localhost:3000');
replServer = repl.start(`${api.path} > `);
// replServer.defineCommand('cd', {
//     action(url){
//         api.cd(url)
//     }
// });
