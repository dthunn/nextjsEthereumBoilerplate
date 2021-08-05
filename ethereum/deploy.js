const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./build/CampaignFactory.json');

dotenv.config({ path: path.resolve(__dirname, '../', '.env') });

const mnemonicPhrase = process.env.MNEMONIC_PHRASE;
const providerUrl = process.env.PROVIDER_URL;

const provider = new HDWalletProvider({
  mnemonic: mnemonicPhrase,
  providerOrUrl: providerUrl,
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy contract from account: ', accounts[0]);

  const contract = await new web3.eth.Contract(abi);
  const deploy = contract.deploy({
    data: '0x' + evm.bytecode.object,
  });
  const campaignFactory = await deploy.send({ from: accounts[0] });

  console.log(
    'Contract deployed at account: ',
    campaignFactory.options.address
  );
};

deploy();
