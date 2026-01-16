// build_bundles.mjs
// Usage: node build_bundles.mjs /absolute/path/to/hanzi-writer-data /absolute/path/to/bundles
// It will read charlist-##.json and output chars-##.json with full data objects.
import fs from 'fs';
import path from 'path';

function hexOfChar(ch){ return ch.codePointAt(0).toString(16); }

const [,, dataDirArg, bundlesDirArg] = process.argv;
if(!dataDirArg || !bundlesDirArg){
  console.error('Usage: node build_bundles.mjs <hanzi-writer-data-dir> <bundles-dir>');
  process.exit(1);
}
const DATA_DIR = path.resolve(dataDirArg);          // e.g. ~/hanzi-writer-data (contains 8a00.json etc.)
const BUNDLES_DIR = path.resolve(bundlesDirArg);    // e.g. ./bundles

for(let n=11; n<=20; n++){
  const listFile = path.join(BUNDLES_DIR, `charlist-${String(n).padStart(2,'0')}.json`);
  if(!fs.existsSync(listFile)){
    console.warn('Skip lesson', n, '(charlist not found)');
    continue;
  }
  const chars = JSON.parse(fs.readFileSync(listFile, 'utf-8'));
  const out = {};
  for(const ch of chars){
    const hex = hexOfChar(ch);
    const file = path.join(DATA_DIR, `${hex}.json`);
    if(!fs.existsSync(file)){
      console.warn(`Missing data for ${ch} (U+${hex.toUpperCase()})`);
      continue;
    }
    out[ch] = JSON.parse(fs.readFileSync(file, 'utf-8'));
  }
  const outFile = path.join(BUNDLES_DIR, `chars-${String(n).padStart(2,'0')}.json`);
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf-8');
  console.log('Built', outFile, 'with', Object.keys(out).length, 'chars');
}
console.log('Done.');