const view = require('./view.js');
const fm = require('./fileH.js');
const isAdmin = require('./isAdmin.js');
module.exports = [
	{
		url:'/',
		mM:'get',
		response(req,res){
			view.go(req,res);
		}
	},
	{
		url:'/styles',
		mM:'get',
		response(req,res){
			fm.do(req,res);
		}
	},
	{
		url:'/scripts',
		mM:'get',
		response(req,res){
			fm.do(req,res);
		}
	},
	{
		url:'/file',
		mM:'get',
		response(req,res){
			fm.do(req,res);
		}
	},
	{
		url:'/verifyAdmin',
		mM:'post',
		response(req,res,app){
			req.on('data',(data)=>{
				isAdmin({data,res,app});
			})
		}
	}
];