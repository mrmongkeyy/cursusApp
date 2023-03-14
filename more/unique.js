module.exports = function(sid='abcdefghijklmnopqrstuvwxyz',len=6){
	let x = '';
	for(let i=0;i<len;i++){
		x += sid[Math.floor(Math.random()*sid.length)];
	}
	return x;
}