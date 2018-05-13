const kl = artifacts.require('./kl.sol');
module.exports = (deployer) => {
  deployer.deploy(kl);
}
