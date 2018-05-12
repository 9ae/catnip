const HDWalletProvider = require('truffle-hdwallet-provider'),
  Web3 = require('web3'),
  compileFactory = require('./build/CampaignFactory.json'),
  provider = new HDWalletProvider(
    'weekend that universe snack have alter silk wheat razor ladder seminar link',
    'https://mainnet.infura.io/D3SAVJhqB6IuHvI8DAeA'
  ),
  web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compileFactory.interface)
  )
    .deploy({ data: compileFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('contract deployed to ', result.options.address);
};

deploy();
