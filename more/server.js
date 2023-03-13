const express = require('express');
const app = express();
const Routes = require('./routes.js');

module.exports = {
	port:process.env.PORT,
	app,
	Routes,
	init(port){
		this.setRoutes();
		this.run(port);
	},
	run(port){
		if(!port && !this.port)port=3000;
		this.app.listen(this.port||port,()=>console.log('server running on ',this.port||port));
	},
	setRoutes(){
		this.Routes.forEach((r)=>{
			this.app[r.mM](r.url,(req,res)=>{r.response(req,res)});
		})
	}
}