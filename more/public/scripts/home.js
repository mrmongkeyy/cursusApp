const cOn = {
	init(config={httpcallinit(){console.log(this)}}){
		this.xhttp = new XMLHttpRequest();
		Object.assign(this.xhttp,config);
		if(config.httpcallinit)this.xhttp.httpcallinit();
	},
	send(){
		this.xhttp.send(this.xhttp.data||'');
	},
	post(config){
		this.init(config);
		this.xhttp.open('POST',this.xhttp.url);
		if(this.xhttp.afterOpen)this.xhttp.afterOpen();
		this.send();
	},
	get(){
		this.init(config);
		this.xhttp.open('GET',this.xhttp.url);
		if(this.xhttp.afterOpen)this.xhttp.afterOpen();
		this.send();
	}

}
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
		'"Cek semua content yang telah kami sediakan, klik pada kursus menu"',
		'"Wawagu menyediakan berbagai macam konten yang dirancang oleh ahli, sehingga terjamin kualitasnya."',
		'"Kembangkan Potensi Anda!"'
	],
	makeElement(el,props={}){
		props.find = function(el){return this.querySelector(el)};
		props.findall = function(el){return this.querySelectorAll(el)};
		return Object.assign(document.createElement(el),props);
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
						background:burlywood;
					}
					#bound-top div{
						font-size:20px;
						margin-right:10px;
						cursor:pointer;
					}
					#bound-top nav{
						display:flex;
						width:100%;
						align-items:center;
					}
					#bound-top nav input{
						background:white;
						padding:10px;
						border:1px solid gray;
						outline:none;
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
								<input placeholder="Cari kursus...">
							</span>
						</div>
						<div>
							<span class=bWhiteBlack>
								Cari
							</span>
						</div>
					</nav>
					<div style=float=right>
						<span id=closeBound class=bWhiteBlack>
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
			bound.find('#closeBound').onclick = ()=>{
				bound.remove();
			}
			app.loadContent();
		},
		aboutUs(e){
			const bound = app.openPop();
			bound.appendChild(app.makeElement('div',{
				id:'bound-container',
				innerHTML:`
					<style>
						#bound-container{
							width:auto;
						}
						#bound-container #msg{
							padding:10px;
							font-size:20px;
							text-align:center;
							margin-bottom:20px;
						}
					</style>
					<div id=msg>
						<span>Web Sedang Dalam Proses Pengembangan. <br>-mrmongkeyy</span>
					</div>
					<div style=text-align:center;>
						<span class=bWhiteBlack style=padding:10px; id=closE>TUTUP</span>
					</div>
				`,
			}));
			bound.find('#closE').onclick = ()=>{
				bound.remove();
			}
		},
		menu(){
			app.openMobileMenu();
		},
		admin(){
			app.verifyAdmin();
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
				<div id=description>
					<span>${content.description||'No description'}</span>
				</div>
				<div id=price>
					<span>RP. ${content.price}</span>
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
				setTimeout(()=>{app.contents.forEach((content,i)=>{app.processContent(content,i)});this.remove();},1000);
			}}));
			return;
		}
		setTimeout(()=>{this.contents.forEach((content,i)=>{this.processContent(content,i)})},1000);
	},
	showContent(index){
		const bound = this.openPop();
		bound.appendChild(this.makeElement('div',{
			className:'showContentPage',
			innerHTML:`
				<div id=top>
					<div style=text-align:left;>Confirmasi Pembelian</div>
					<div style=text-align:right><span class=bBlackWhite id=closE>Tutup</span></div>
				</div>
				<div id=bottom>
					<div>
						<div id=preview>
							<span><img src=/file?fn=noimage.jpg id=previewImg></span>
						</div>
						<div id=sideO>
							<div id=title>
								<span>${this.contents[index].title}</span>
							</div>
							<div id=description>
								<span>${this.contents[index].description||'No description'}</span>
							</div>
							<div id=bottomSection>
								<div id=pricE>
									<span>RP. ${this.contents[index].price}</span>
								</div>
								<div style=text-align:right;>
									<span class=bWhiteBlack id=bayaR>BAYAR</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			`,
		}));
		bound.find('#closE').onclick = ()=>{
			bound.remove();
		}
		bound.find('#bayaR').onclick = ()=>{
			this.payment.init();
		}
	},
	payment:{
		open(){
			const bound = app.openPop();
			bound.appendChild(app.makeElement('div',{
				id:'bound-container',
				innerHTML:`
					<style>
						#bound-container{
							width:auto;
						}
						#bound-container #msg{
							padding:10px;
							font-size:20px;
							text-align:center;
							margin-bottom:20px;
						}
					</style>
					<div id=msg>
						<span>PAYMENT API SEDANG DALAM PROSES INTEGRASI. <br>-mrmongkeyy</span>
					</div>
					<div style=text-align:center;>
						<span class=bWhiteBlack style=padding:10px; id=closE>TUTUP</span>
					</div>
				`,
			}));
			bound.find('#closE').onclick = ()=>{bound.remove()};
		},
		pay(){

		},
		init(){
			this.open();
		}
	},
	openMobileMenu(){
		const bound = this.openPop();
		bound.appendChild(this.makeElement('div',{
			id:'mobileMenu',
			innerHTML:`
				<style>
					#mobileMenu{
						position:absolute;
						top:0;
						text-align:center;
						background:white;
						font-size:25px;
					}
					#mobileMenu div{
						margin:15px;
					}
				</style>
				<div>
					<span id=kursus>Kursus</span>
				</div>
				<div>
					<span id=aboutUs>Tentang Kami</span>
				</div>
				<div>
					<span id=admin>ADMIN</span>
				</div>
				<div>
					<span class=bWhiteBlack id=closE>TUTUP</span>
				</div>
			`,
		}));
		let closeSpan = bound.find('#closE');
		closeSpan.onclick = ()=>bound.remove();
		bound.findall('span').forEach((span,i)=>{
			if(i<=2){
				span.onclick = ()=>{
					closeSpan.click();
					this.eventButton[span.id]();
				}
			}
		})
		
	},
	verifyAdmin(){
		const bound = this.openPop();
		bound.appendChild(this.makeElement('div',{
			id:'verifyPanel',
			innerHTML:`
				<style>
					#verifyPanel{
						background:white;
						padding:20px;
					}
					#verifyPanel div{
						margin-top:20px;
					}
					#verifyPanel #navigation{
						display:flex;
						justify-content:space-between;
					}
				</style>
				<div id=top>
					<span id=invalidmsg style=color:red></span><br>
					<span>Verify your indentity.</span>
				</div>
				<div id=body>
					<div>
						<input placeholder=Username id=username>
					</div>
					<div>
						<input placeholder=Password type=password id=password>
					</div>
				</div>
				<div id=navigation>
					<div>
						<span class=bWhiteBlack id=loginB>LOGIN</span>
					</div>
					<div>
						<span class=bWhiteBlack id=closE>TUTUP</span>
					</div>
				</div>
			`,
		}));
		const closebutton = bound.find('#closE');
		closebutton.onclick = ()=>bound.remove();
		bound.find('#loginB').onclick = ()=>this.passchck(
			bound.find('#username').value,
			bound.find('#password').value,
			closebutton,bound.find('#invalidmsg')
		);
	},
	passchck(username,password,closebutton,invalidmsg){
		cOn.post({
			url:'/verifyAdmin',
			data:JSON.stringify({username,password}),
			onload(res){
				const data = JSON.parse(this.response);
				if(data.valid){
					closebutton.click();
					location.href += (data.route+'?page=adminPanel');
				}else{
					invalidmsg.innerText = data.msg;
				}
			}
		})
	}
}
app.init();