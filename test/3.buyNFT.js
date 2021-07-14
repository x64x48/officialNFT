const config = require('./env.json');
const NFTJSON = require('../build/contracts/NFT.json');
const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(config.web3);

const NFTAddress = config.NFTAddress;
const user1 = config.user1;

async function buyNFT (caller, addr, tokenId) {
  const contract = new web3.eth.Contract(NFTJSON.abi, NFTAddress);

  const transfer = contract.methods.buyNFT(addr, tokenId);
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

async function main () {
  await buyNFT(user1, user1.address, 9999);
}

main();
