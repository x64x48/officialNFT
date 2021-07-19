const config = require('./env.json');
const NFTJSON = require('../build/contracts/NFT.json');
const ERC20 = require('../build/contracts/MyERC20.json');
const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(config.web3);

const ERC20Address = config.ERC20Address;
const NFTAddress = config.NFTAddress;
const user1 = config.user1;

async function withdrew (caller, addr, amount) {
  const contract = new web3.eth.Contract(NFTJSON.abi, NFTAddress);

  const transfer = contract.methods.withdrew(addr, amount);
  const encodedABI = transfer.encodeABI();
  
  const tx = {
    from: caller.address,
    to: NFTAddress,
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

async function getBalance (caller, addr) {
  const contract = new web3.eth.Contract(ERC20.abi, ERC20Address, {
    from: caller.address
  });
  const balance = await new Promise(function (resolve, reject) {
    contract.methods.balanceOf(addr).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
  console.log({ balance });
  return balance;
}

async function main () {
  const balance = await getBalance(user1, NFTAddress);
  await withdrew(user1, user1.address, balance);
}

main();
