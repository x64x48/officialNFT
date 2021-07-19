const NFT = artifacts.require("NFT")
const MyERC20 = artifacts.require("MyERC20")


module.exports = async function (deployer) {
  const erc20 = await new Promise(function (resolve, reject) {
    deployer.deploy(MyERC20, "officialNFT20", "officialNFT20").then(async (i) => {
      console.log("complete deploy, MyERC20's contract address: " + i.address)
      resolve(i.address)
    })
  })
  const nft = await new Promise(function (resolve, reject) {
    deployer.deploy(NFT, "officialNFT721", "officialNFT721", erc20).then(async (i) => {
      console.log("complete deploy, NFT's contract address: " + i.address)
      resolve(i.address)
    })
  })
};
