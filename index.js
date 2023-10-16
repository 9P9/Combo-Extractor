const fs = require('fs').promises;

let done = 0;

async function write(content, file) {
    await fs.appendFile(file, content);
}

async function clear(file) {
    await fs.truncate(file, 0);
}

async function extract(splitter, pos) {
  try {
    const combos = (await fs.readFile('combos.txt', 'utf-8')).replace(/\r/gi, '').split('\n');
    process.title = `[313] Combo Extractor | Size: ${combos.length}`;

    for (let i = 0; i < combos.length; i++) {
      const combo = combos[i];
      try {
        const a = combo.split(splitter)[pos - 1];
        done++;
        await write(`${a}\n`, 'parsed.txt');
        process.title = `[313] Combo Extractor | Size: ${combos.length} | ${done}/${combos.length}`;
      } catch (err) {
      }
    }
  } catch (err) {
    console.error(`Error reading combos.txt: ${err}`);
  }
}
async function main() {
  await clear('parsed.txt');
  await extract(':', 1);
}

main();
