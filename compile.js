const path = require('path'),
solc = require('solc'),
fs = require('fs-extra'),
buildPath = path.resolve(__dirname,'build');

fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, 'contracts', 'Campaign.sol'),
source = fs.readFileSync(contractPath, 'utf8'),
output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for(let contract in output){
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract.replace(':','')}.json`),
    output[contract]
  );
}
