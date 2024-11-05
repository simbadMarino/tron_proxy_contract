var Implementation = artifacts.require("./Implementation.sol");
//var TokenProxy = artifacts.require("./TokenProxy.sol");
module.exports = function (deployer) {
  deployer.deploy(Implementation, ['SimbadProxy', 'SPRXY', '100000000000000000000000'], { deployer, initializer: 'initialize' });
  // await deployProxy(MyToken, ['My Token', 'TKN', '100000000000000000000000'], { deployer, initializer: 'initialize' });

};
