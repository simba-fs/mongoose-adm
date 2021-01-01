#!/usr/bin/env node
const axios = require('axios');
const path = require('path');
const url = require('url');
const repl = require('repl');

class Request{
	constructor(path){
		this.path = path;
		this.initialPath = path;
		this._query = {};
		this._body = {};
	}

	/** util */
	showData(data){
		console.log(data.data);
	}

	/** query, body */
	query(name, value){
		if(value) this._query[name] = value;
		else console.log('Query \'%s\' = \'%s\'', name, this._query[name]);
		return this;
	}

	removeQuery(name){
		delete this._query[name];
		return this;
	}

	body(name, value){
		if(value) this._body[name] = value;
		else console.log('Body \'%s\' = \'%s\'', name, this._body[name]);
		return this;
	}

	removeBody(name){
		delete this._body[name];
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
	async get(){
		data = await axios.get(this.path, {
			params: this._query,
			data: this._body
		});
		return data;
	}

	post(){
		axios.post(this.path, {
			params: this._query,
			data: this._body
		}).then(this.showData, this.showData);
		return this;

	}

	put(){
		axios.put(this.path, {
			params: this._query,
			data: this._body
		}).then(this.showData, this.showData);
		return this;

	}

	delete(){
		axios.delete(this.path, {
			params: this._query,
			data: this._body
		}).then(this.showData, this.showData);
		return this;

	}
}

api = new Request(process.argv[2] || 'http://localhost:3000');
replServer = repl.start(`${api.path} > `);

/** define command */
// replServer.defineCommand('cd', {
//     help: 'Customed command, change current path',
//     action: api.cd
// });
// replServer.defineCommand('get', {
//     help: 'Customed command, http method: GET',
//     action: () => api.get()
// });
// replServer.defineCommand('query', {
//     help: 'Customed command, set/get query',
//     action: (...arg) => api.query(...arg)
// });
// replServer.defineCommand('removeQuery', {
//     help: 'Customed command, remove query',
//     action: (...arg) => api.removeQuery(...arg)
// });
// replServer.defineCommand('body', {
//     help: 'Customed command, set/get body',
//     action: (...arg) => api.body(...arg)
// });
// replServer.defineCommand('removeBody', {
//     help: 'Customed command, remove body',
//     action: (...arg) => api.removeBody(...arg)
// });
