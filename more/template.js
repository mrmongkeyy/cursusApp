module.exports = {
	top(config){
		return `
			<!DOCTYPE HTML>
			<html>
			<head>
				<title>${config.title}</title>
				<style>body{font-family:calibri;user-select:none;font-weight:bold;-webkit-tap-highlight-color:transparent;}</style>
				<meta name=viewport content=width=device-width,initial-scale=1>
				<link rel=stylesheet href=/styles?fn=${config.style}>
			</head>
		`;
	},
	body(config){
		return `<body>${this[config.page](config)}</body>`; 
	},
	bottom(config){
		let text = `
			<script src=/scripts?fn=${config.script}></script>
		`;

		text += '</html>';
		return text;
	},
	home(config){
		return `
			<main>
				<div id=top>
					<div id=hightitle>
						<span>WAWAGU</span>
					</div>
					<nav>
						<div id=desktopM>
							<div>
								<span id=kursus>Kursus</span>
							</div>
							<div>
								<span id=aboutUs>Tentang Kami</span>
							</div>
							<div>
								<span class=bWhiteBlack id=admin>ADMIN</span>
							</div>
						</div>
						<div id=mobileM>
							<div>
								<span class=bWhiteBlack id=menu>MENU</span>
							</div>
						</div>
						<div id=searchTool style=display:flex;align-items:center>
							<div>
								<span>
									<input placeholder="Temukan Kursusnya..." id=searchInput>
								</span>
							</div>
							<div>
								<span id=find class=bWhiteBlack>
									Cari
								</span>
							</div>
						</div>
					</nav>
				</div>
				<div id=bottom>
					<div id=aquote>
					</div>
				</div>
			</main>
		`;
	},
	adminPanel(config){
		return `
			<main>
				<div id=top>
					<div id=hightitle>
						<span>ADMIN</span>
					</div>
					<nav>
						<div id=desktopM>
							<div>
								<span id=kursus class=bWhiteBlack>Tambah Konten</span>
							</div>
					</nav>
				</div>
				<div id=bottom>
					<div id=aquote>
					</div>
				</div>
			</main>
		`;
	},
	make(config){
		return this.top(config)+this.body(config)+this.bottom(config);
	}
}