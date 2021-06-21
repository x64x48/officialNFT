const config = require('./env.json');
const NFTJSON = require('../build/contracts/NFT.json');
const Web3 = require('web3');
const Contract = require('web3-eth-contract');

const web3 = new Web3(config.web3);

const ERC20Address = config.ERC20Address;
const NFTAddress = config.NFTAddress;
const user1 = config.user1;

const seeds = [{
  tokenId: 1,
  tokenURI: JSON.stringify({
    name: '01',
    img: 'https://images.chinatimes.com/newsphoto/2021-05-09/1024/20210509001178.jpg',
    coupon: 'XXYYZZ',
    remark: 'aaa'
  }),
  price: 380000
}, {
  tokenId: 2,
  tokenURI: JSON.stringify({
    name: '02',
    img: 'https://images.chinatimes.com/newsphoto/2020-06-04/1024/20200604002777.jpg',
    coupon: 'XXYYZZ',
    remark: 'aaa'
  }),
  price: 400000
}, {
  tokenId: 3,
  tokenURI: JSON.stringify({
    name: '03',
    img: 'https://s.yimg.com/ny/api/res/1.2/3utRcz6MYwys6LcGa7NymA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTEzOTIuOTQxMTc2NDcwNTg4Mw--/https://s.yimg.com/uu/api/res/1.2/tg3lzxLXmzgNLYLH_Z5Dbg--~B/aD03NDA7dz01MTA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/setn.com.tw/487d4ed35798312cf5751f4f6c8bca74',
    coupon: 'XXYYZZ',
    remark: 'aaa'
  }),
  price: 160000
}, {
  tokenId: 4,
  tokenURI: JSON.stringify({
    name: '04',
    img: 'https://cdn2.ettoday.net/images/4967/d4967114.jpg',
    coupon: 'XXYYZZ',
    remark: 'aaa'
  }),
  price: 260000
}, {
  tokenId: 5,
  tokenURI: JSON.stringify({
    name: '05',
    img: 'https://hk.ulifestyle.com.hk/cms/images/topic/1024x576/201805/20180504133106_4_PCPU18040-2018-may-4-054.jpg',
    coupon: 'XXYYZZ',
    remark: 'aaa'
  }),
  price: 770000
}]

async function mint (tokenId, tokenURI, price) {
  return new Promise(function (resolve, reject) {
    const contract = new web3.eth.Contract(NFTJSON.abi, NFTAddress);
    const transfer = contract.methods.mintUniqueTokenTo(tokenId, tokenURI, price);
    const encodedABI = transfer.encodeABI();

    const tx = {
      from: user1.address,
      to: NFTAddress,
      gas: 2000000,
      data: encodedABI
    };

    web3.eth.accounts.signTransaction(tx, user1.privateKey).then(signed => {
      var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
      // tran.on('transactionHash', hash => {
      //   console.log('hash');
      //   console.log(hash);
      // });
      tran.on('receipt', receipt => {
        // console.log('reciept');
        // console.log(receipt);
        resolve(receipt);
      });
      tran.on('error', error => {
        reject(error);
      });
    });
  });
}

async function main () {
  // const rnd = Math.floor(Math.random() * 1000)
  // const tokenId = rnd
  // const tokenURI = JSON.stringify({
  //   name: 'name',
  //   img: '',
  //   coupon: '',
  //   remark: 'aaa'
  // })
  // const price = rnd;
  // await mint(tokenId, tokenURI, price);

  for (let i in seeds) {
    const seed = seeds[i]
    await mint(seed.tokenId, seed.tokenURI, seed.price);
  }
}

main();
