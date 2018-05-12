const HDWalletProvider = require('truffle-hdwallet-provider'),
  Web3 = require('web3'),
  fs = require('fs-extra'),
  compileERC721Interface = require('./build/ERC721.json'),
  provider = new HDWalletProvider(
    'weekend that universe snack have alter silk wheat razor ladder seminar link',
    'https://mainnet.infura.io/D3SAVJhqB6IuHvI8DAeA'
  ),
  web3 = new Web3(provider);
var data = [];

const getData = async () => {
  const accounts = await web3.eth.getAccounts();

  //console.log(accounts[0]);

  const instance = new web3.eth.Contract(
    JSON.parse(compileERC721Interface.interface),
    '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
  );
  const totalSupply = await instance.methods.totalSupply().call();
  console.log(totalSupply);
  // const _owner = await instance.methods.ownerOf(1).call();
  // console.log(_owner);

  for (var i = 1; i < 1000; i++) {
    const _owner = await instance.methods.ownerOf(i).call();
    console.log('on cat number ' + i + '/' + totalSupply);
    data.push({
      catID: i,
      owner: _owner
    });
  }

  for (var i = 1001; i < 2000; i++) {
    const _owner = await instance.methods.ownerOf(i).call();
    console.log('on cat number ' + i + '/' + totalSupply);
    data.push({
      catID: i,
      owner: _owner
    });
  }

  fs.writeFile('./data.json', JSON.stringify(data), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File has been created');
  });

  console.log(data);
};

getData();
