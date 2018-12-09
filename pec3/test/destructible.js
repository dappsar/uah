const Destructible = artifacts.require('./Destructible.sol');

/**
 * @title Test para el contrato Destructible
 * Crédito: https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.2.0/test/Destructible.js
 */
contract('Destructible', function (accounts) {

    /**
     * @Dev Test Generales
     */
    describe('Test Generales del contrato Destructible', function () {


        /**
         * @Dev Test de envío de balance al owner, al destruir el contrato
         */
        it('Debe enviar el balance al owner, luego de destruido el contrato', async function () {
            let destructible = await Destructible.new({
                from: accounts[0],
                value: web3.toWei('10', 'ether')
            });
            let owner = await destructible.owner();
            let initBalance = web3.eth.getBalance(owner);
            await destructible.destroy({
                from: owner
            });
            let newBalance = web3.eth.getBalance(owner);
            assert.isTrue(newBalance > initBalance);
        });

        /**
         * @Dev Test de envío de balance a otra cuenta, al destruir el contrato
         */
        it('Debe enviar el balance a la dirección pasada como parámetro, luego de destruido el contrato', async function () {
            let destructible = await Destructible.new({
                from: accounts[0],
                value: web3.toWei('10', 'ether')
            });
            let owner = await destructible.owner();
            let initBalance = web3.eth.getBalance(accounts[1]);
            await destructible.destroyAndSend(accounts[1], {
                from: owner
            });
            let newBalance = web3.eth.getBalance(accounts[1]);
            assert.isTrue(newBalance.greaterThan(initBalance));
        });

    })
});