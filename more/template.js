module.exports = {
	top(config){
		return `
			<!DOCTYPE HTML>
			<html>
			<head>
				<title>${config.title}</title>
				<style>body{font-family:calibri}</style>
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
						<div>
							<span id=kursus>Kursus</span>
						</div>
						<div>
							<span id=aboutUs>Tentang Kami</span>
						</div>
						<div>
							<span>
								<input placeholder="Temukan Kursusnya...">
							</span>
						</div>
						<div>
							<span id=cari>
								Cari
							</span>
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