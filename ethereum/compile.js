/**
 * Script to compile contracts and output to json file
 */

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');

// Deletes everything in buildPath
fs.removeSync(buildPath);

const campaingPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaingPath, 'utf-8');

const input = {
  language: 'Solidity',
  sources: {
    'campaign.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// Object with all contracts as properties
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'campaign.sol'
];

// Ensure directory exists or will build instead
fs.ensureDirSync(buildPath);

// Output contracts to json file
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}
