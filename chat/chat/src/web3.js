import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
  //in browser and has metamask
  web3 = new Web3(window.web3.currentProvider);
} else {
  //in server or no metamask
  const provider = new Web3.providers.HttpProvider(
    'https://main.infura.io/D3SAVJhqB6IuHvI8DAeA'
  );

  web3 = new Web3(provider);
}

export default web3;
