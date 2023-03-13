const path = require('path');
module.exports = {
	do(req,res){
		this[req._parsedUrl.pathname](req.query.fn,res);
	},
	"/scripts"(fn,res){
		res.sendFile(`./public/scripts/${fn}.js`,{root:path.join(__dirname)},(err)=>{
			if(err)throw err;
		})
	},
	"/styles"(fn,res){
		res.sendFile(`./public/styles/${fn}.css`,{root:path.join(__dirname)},(err)=>{
			if(err)throw err;
		})
	},
	"/file"(fn,res){
		res.sendFile(`./public/media/${fn}`,{root:path.join(__dirname)},(err)=>{
			if(err)throw err;
		})
	}
}