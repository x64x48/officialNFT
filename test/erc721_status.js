
const config = require('./env.json');
const NFTJSON = require('../build/contracts/NFT.json');
const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(config.web3);

const ERC20Address = config.ERC20Address;
const NFTAddress = config.NFTAddress;
const user1 = config.user1;

const contract = new web3.eth.Contract(NFTJSON.abi, NFTAddress, {
  from: user1.address
});


async function main () {
  await getNFTStatus(user1.address);
  await getNFTStatus(NFTAddress);
}

async function getNFTStatus (addr) {
  const balance = await new Promise(function (resolve, reject) {
    contract.methods.balanceOf(addr).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
  console.log(`addr: ${addr}, balance: ${balance}`);

  for (let i = 0; i < balance; i++) {
    const index = await new Promise(function (resolve, reject) {
      contract.methods.tokenOfOwnerByIndex(addr, i).call((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    const URI = await new Promise(function (resolve, reject) {
      contract.methods.tokenURI(index).call((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    const price = await new Promise(function (resolve, reject) {
      contract.methods.getTokenPrice(index).call((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    console.log(`index: ${index}, tokenURI: ${URI}, price: ${price}`)
  }
}

main();
