const ERC1967Proxy = require('@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json')
const Box = artifacts.require('UUPSBox')

module.exports = async function (deployer) {
    try {
        await deployer.deploy(Box)
        const proxy = await tronWrap.contract().new({
            abi: ERC1967Proxy.abi,
            bytecode: ERC1967Proxy.bytecode,
            feeLimit: 1000 * 1e6,
            parameters: [Box.address, '0x'],
        })
        console.log('Impl', Box.address)
        console.log('Proxy', proxy.address)
        Box.address = proxy.address
        const box = await Box.deployed()

        const beforeValue = await box.value()
        console.log('Value before', beforeValue.toNumber())

        // Set new Value
        await box.setValue(beforeValue.toNumber() + 100)
        const afterValue = await box.value()
        console.log('Value after', afterValue.toNumber())
    } catch (error) {
        console.log('UUPS: deploy box error', error)
    }
}
