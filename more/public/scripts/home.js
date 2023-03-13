const app = {
	contents:undefined,
	find(el){
		return document.querySelector(el);
	},
	findall(el){
		return document.querySelectorAll(el);
	},
	init(){
		this.setupButton();
		this.showMsg();
	},
	setting:{
		intervalSpeed:100
	},
	showMsg(){
		let index = 0;
		const start = ()=>{
			this.find('#aquote').innerHTML = '';
			let msgI = 0;
			let interval = setInterval(()=>{
				const span = this.makeElement('span');
				span.innerText = this.msgs[index][msgI];
				this.find('#aquote').appendChild(span);
				msgI++;
				if(msgI===this.msgs[index].length){
					clearInterval(interval);
					index++;
					if(index===this.msgs.length)index=0;
					setTimeout(start,1000);
				}
			},this.setting.intervalSpeed);
		}
		start();
	},
	msgs:[
		'"Selamat Datang Di Wawagu."',
		'"Wawagu menyediakan berbagai macam konten yang dirancang oleh ahli, sehingga terjamin kualitasnya."',
		'"Kembangkan Potensi Anda!"'
	],
	makeElement(el,props){
		return Object.assign(document.createElement(el),props||{});
	},
	eventButton:{
		kursus(e){
			const bound = app.openPop();
			bound.appendChild(app.makeElement('div',{id:'bound-container',innerHTML:`
				<style>
					#bound-top{
						width:96%;
						height:20%;
						float:left;
						display:flex;
						align-items:center;
						padding:2%;
					}
					#bound-top div{
						font-size:20px;
						margin-right:10px;
						cursor:pointer;
					}
					#bound-top nav{
						display:flex;
						width:100%;
					}
					#bound-body{
						width:96%;
						display:flex;
						flex-direction:column;
						align-items:center;
						justify-content:center;
						padding:2%;
						overflow:auto;
						max-height:500px;
						flex-wrap:wrap;
					}
				</style>
				<div id=bound-top>
					<div>
						<span>Wawagu Kursus</span>
					</div>
					<nav>
						<div>
							<span>
								<input>
							</span>
						</div>
						<div>
							<span>
								Cari
							</span>
						</div>
					</nav>
					<div style=float=right>
						<span id=closeBound>
							Tutup
						</span>
					</div>
				</div>
				<div id=bound-body>
					<div id=loadingCourse>
						<span>
							<img src=/file?fn=loading.gif>
						</span>
					</div>
				</div>
			`}));
			bound.querySelector('#closeBound').onclick = ()=>{
				bound.remove();
			}
			app.loadContent();
		},
		aboutUs(e){
			app.openPop();
		}
	},
	setupButton(){
		this.findall('nav span').forEach(item=>{
			if(item.id){
				item.onclick = this.eventButton[item.id];	
			}
		})
	},
	openPop(){
		const bound = this.makeElement('div',{id:'bound'});
		document.body.appendChild(bound);
		return bound;
	},
	processContent(content,index){
		const div = this.makeElement('div',{index,
			className:'content-item',innerHTML:`
				<div>
					<span><img src=/file?fn=noimage.jpg></span>
				</div>
				<div id=title>
					<span>${content.title}</span>
				</div>
				<div id=price>
					<span>${content.price}</span>
				</div>
			`,
		});
		div.onclick = ()=>{
			this.showContent(div.index);
		}
		if(this.find('#loadingCourse'))this.find('#loadingCourse').remove();
		this.find('#bound-body').appendChild(div);
	},
	loadContent(){
		if(!this.contents){
			document.body.appendChild(this.makeElement('script',{src:'/scripts?fn=content',onload(){
				setTimeout(()=>{app.contents.forEach((content,i)=>{app.processContent(content,i)})},1000);
			}}));
			return;
		}
		setTimeout(()=>{this.contents.forEach((content,i)=>{this.processContent(content,i)})},1000);
	},
	showContent(index){
		
	}
}
app.init();