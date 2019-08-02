const path = require('path');
const solc = require('solc');

// fs-extra = file system module with helpers
const fs = require('fs-extra')

// 1.Deletes entire build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// 2. Read 'ThreeJudge.sol' from the 'contracts' folder
const contractPath = path.resolve(__dirname, 'contracts', 'ThreeJudge.sol');

// Note: You should be defining your contract sources as objects now.
// Note: You must also provide the compiler output selection as well.
const compilerInput = {
    language: "Solidity",
    sources: {
        'ThreeJudge': { content: fs.readFileSync(contractPath, 'utf8') }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": [ "abi", "evm.bytecode" ]
        }
      }
    }
};

console.log('Compiling the contract')
// Note: You have to pass the input in with JSON.stringify now.
const compiledContract = JSON.parse(solc.compile(JSON.stringify(compilerInput))).contracts;
console.log('compiledContract', compiledContract);

if(compiledContract.errors) {
    compiledContract.errors.forEach(err => console.log('ERROR compiledContract.errors', err.formattedMessage));
}

fs.ensureDirSync(buildPath);
for (let contract in compiledContract) {
  console.log('contract', contract);
    fs.outputJSONSync(
        path.resolve(buildPath, `${contract}.json`),
        compiledContract[contract]
    );
}

// // Note: This changed slightly since I'm using JSON.parse above.
// const ThreeJudge = compiledContract.contracts['ThreeJudge'];
// console.log(ThreeJudge);

// // Note: This is now called 'abi' and not 'interface'
// const abi = ThreeJudge.abi;
// fs.writeFileSync('ThreeJudge.json', JSON.stringify(abi, null, 2));

// export default compiledContract;
