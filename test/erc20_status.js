const config = require('./env.json');
const ERC20 = require('../build/contracts/MyERC20.json');
const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(config.web3);

const ERC20Address = config.ERC20Address;
const NFTAddress = config.NFTAddress;
const user1 = config.user1;

const contract = new web3.eth.Contract(ERC20.abi, ERC20Address, {
  from: user1.address
});

async function getBalance (addr) {
  const balance = await new Promise(function (resolve, reject) {
    contract.methods.balanceOf(addr).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
  console.log(`addr: ${addr}, balance: ${balance}`);
}

async function getAllowance (addr1, addr2) {
  const balance = await new Promise(function (resolve, reject) {
    contract.methods.allowance(addr1, addr2).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
  console.log(`allowance: ${balance}`);
}

async function getTransactionCount (addr) {
  const count = await new Promise(function (resolve, reject) {
    web3.eth.getTransactionCount(addr).then((balance) => {
      resolve(balance);
    }).catch((err) => {
      reject(err);
    });
  });
  console.log(`addr: ${addr}, count: ${count}`);
}

async function getBlock () {
  const block = await new Promise(function (resolve, reject) {
    web3.eth.getBlock('latest').then((block) => {
      resolve(block);
    }).catch((err) => {
      reject(err);
    });
  });
  console.log(`block: ${block.number}`);
}

async function main () {
  await getBlock();
  await getBalance(user1.address);
  await getBalance(NFTAddress);
  await getAllowance(user1.address, NFTAddress);
}

main();
