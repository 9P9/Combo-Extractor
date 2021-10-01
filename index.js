const fs = require(`fs`); 
const chalk = require("chalk");
const readline = require("readline");

var done = 0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function write(content, file) {
    fs.appendFile(file, content, function(err) {});
}
function clear(file) {
    var stream = fs.createWriteStream(file);
    stream.once('open', function(fd) {
        stream.write("");
        stream.end();
    });
}
clear("parsed.txt");
process.title = `[313] Combo Extractor`;
console.log(`
 ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗     ███████╗██╗  ██╗████████╗██████╗  █████╗  ██████╗████████╗ ██████╗ ██████╗ 
██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗    ██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗
██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║    █████╗   ╚███╔╝    ██║   ██████╔╝███████║██║        ██║   ██║   ██║██████╔╝
██║     ██║   ██║██║╚██╔╝██║██╔══██╗██║   ██║    ██╔══╝   ██╔██╗    ██║   ██╔══██╗██╔══██║██║        ██║   ██║   ██║██╔══██╗
╚██████╗╚██████╔╝██║ ╚═╝ ██║██████╔╝╚██████╔╝    ███████╗██╔╝ ██╗   ██║   ██║  ██║██║  ██║╚██████╗   ██║   ╚██████╔╝██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝  ╚═════╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝
`);


rl.question(chalk.hex("DF362D")("[?] What symbol are you trying to split from? "), async (option) => {
	let splitter = option;
	console.log(`[!] Symbol Set to ${splitter}`);
	rl.question(chalk.hex("DF362D")(`[?] What part of the String are you trying to obtain e.g hello:world - "Hello" would = 1? `), async (option) => {
		let pos = option;
		console.log(`[!] Position: ${pos}`);
		extract(splitter, pos);
	})
})

function extract(splitter, pos) {
	const combos = fs.readFileSync('combo.txt', 'utf-8').replace(/\r/gi, '').split('\n');
	process.title = `[313] Combo Extractor | Size: ${combos.length}`;
    var i = 0;
    var int = setInterval(() => {
        if (i >= combos.length) return clearInterval(int);
        try{
			var combo = combos[i++];
			var a = combo.split(splitter)[pos - 1];
			done++;
		    write(`${a}\n`,`parsed.txt`);		
			process.title = `[313] Combo Extractor | Size: ${combos.length} | ${done}/${combos.length}`;
		}
		catch(err){

		}
    });
	
}
