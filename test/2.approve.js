const config = require('./env.json');
const ERC20 = require('../build/contracts/MyERC20.json');
const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(config.web3);

const ERC20Address = config.ERC20Address;
const NFTAddress = config.NFTAddress;
const user1 = config.user1;

async function approve (caller, addr, amount) {
  const contract = new web3.eth.Contract(ERC20.abi, ERC20Address);

  const transfer = contract.methods.approve(addr, amount);
  const encodedABI = transfer.encodeABI();

  const tx = {
    from: caller.address,
    to: ERC20Address,
    gas: 2000000,
    data: encodedABI
  }; 

  web3.eth.accounts.signTransaction(tx, caller.privateKey).then(signed => {
    var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

    tran.on('confirmation', (confirmationNumber, receipt) => {
      console.log('confirmation: ' + confirmationNumber);
    });

    tran.on('transactionHash', hash => {
      console.log('hash');
      console.log(hash);
    });

    tran.on('receipt', receipt => {
      console.log('reciept');
      console.log(receipt);
    });

    tran.on('error', console.error);
  });
}

async function main () {
  await approve(user1, NFTAddress, 9999);
}

main();
