const iModule = require('./iModule.js');
const template = require('./template.js');
module.exports = {
	go(req,res){
		this.req = req;
		this.res = res;
		if(iModule.getLen(this.req.query)===0){
			this.req.query.page = 'home';
		}else if(!this[this.req.query.page]){
			res.send('<h4>Opps, page not found.</h4>');
			return;
		}
		this[this.req.query.page]();
	},
	home(){
		this.res.send(template.make({title:'Kursus Online Wawagu',page:'home',style:'home',script:'home'}));
	},
	adminPanel(){
		this.res.send(template.make({title:'Wawagu Admin Panel',page:'adminPanel',style:'home',script:'admin'}));
	}
}