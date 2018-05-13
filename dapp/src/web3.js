var Web3 = require('web3');

componentWillMount(){
 window.addEventListener('load', function () {
   if (typeof web3 !== 'undefined') {
       window.web3 = new Web3(window.web3.currentProvider)
       if (window.web3.currentProvider.isMetaMask === true) {
           window.web3.eth.getAccounts((error, accounts) => {
               if (accounts.length === 0) {
                   // there is no active accounts in MetaMask
               }
               else {
                   // It's ok
               }
           });
       } else {
           // Another web3 provider
       }
   } else {
       alert("App will not work if MetaMask is not installed");

   }
});
}

//Get List Of accounts in MetaMask
window.web3.eth.getAccounts().then(accs=>{
   window.web3.eth.sign(msg,accs[0]);
 })
