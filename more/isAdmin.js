const fs = require('fs');
const path = require('path');
const view = require('./view');
const getUnique = require('./unique.js');
module.exports = function(config){
	fs.readFile('more/private/db',function(err,data){
		if(err)throw err;
		let db = JSON.parse(data.toString());
		let reqData = JSON.parse(config.data.toString());
		let res = {valid:false};
		if(db.username===reqData.username){
			if(db.password===reqData.password){
				res.valid = true;
				res.route = getUnique();
				config.app.get(`/${res.route}`,(req,res)=>{
					view.go(req,res);
				})
			}else res.msg = 'invalid password';
		}else res.msg = 'invalid username';
		config.res.send(JSON.stringify(res));
	})
}