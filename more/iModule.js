module.exports = {
	getLen(obj){
		if(typeof obj==='object'){
			let x=0;
			for(let i in obj)x+=1;
			return x;
		}
	}
}