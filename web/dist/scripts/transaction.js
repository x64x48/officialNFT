let sending = false;

async function tryJSON (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

async function ownerOf (tokenId) {
  return new Promise(function (resolve, reject) {
    NFTContract.methods.ownerOf(tokenId).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function tokenOfOwnerByIndex (addr, i) {
  return new Promise(function (resolve, reject) {
    NFTContract.methods.tokenOfOwnerByIndex(NFTAddress, i).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function getTokenURI (tokenId) {
  return new Promise(function (resolve, reject) {
    NFTContract.methods.tokenURI(tokenId).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function getTokenPrice (tokenId) {
  return parseInt(await new Promise(function (resolve, reject) {
    NFTContract.methods.getTokenPrice(tokenId).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  }));
}

async function getApprove () {
  return parseInt(await new Promise(function (resolve, reject) {
    ERC20Contract.methods.allowance(account, NFTAddress).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  }));
}

async function setApprove (amount) {
  return new Promise(function (resolve, reject) {
    const transfer = ERC20Contract.methods.approve(NFTAddress, amount);
    const encodedABI = transfer.encodeABI();
    const tx = {
      from: account,
      to: ERC20Address,
      gas: 2000000,
      data: encodedABI
    };
    const tran = web3.eth.sendTransaction(tx);
    tran.on('receipt', receipt => { resolve(receipt); });
    tran.on('error', err => { reject(err) });
  });
}

async function transferFrom () {
  if (sending){
    alert('something running!');
    return;
  }
  sending = true;
  try {
    let to = document.getElementById('wallectAddress').value;
    let tokenId = sendingTokenId;
    const receipt = await new Promise(function (resolve, reject) {
      const transfer = NFTContract.methods.transferFrom(account, to, tokenId);
      const encodedABI = transfer.encodeABI();
      const tx = {
        from: account,
        to: NFTAddress,
        gas: 2000000,
        data: encodedABI
      };
      const tran = web3.eth.sendTransaction(tx);
      tran.on('receipt', receipt => { resolve(receipt); });
      tran.on('error', err => { reject(err) });
    });
    if (receipt) {
      alert('done!');
    }
  } catch (e) {
    alert('transfer failed!');
  } finally {
    sending = false;
    window.location.href = '/mynfts.html';
  }
}

async function buyNFT (tokenId) {
  if (sending){
    alert('something running!');
    return;
  }
  sending = true;
  let approve = false;
  try {
    const price = await getTokenPrice(tokenId);
    if (await getApprove() < await getTokenPrice(tokenId)) {
      alert('approving ERC20 token');
      const approveR = await setApprove(price);
      if (approveR.status) {
        approve = true;
      }
    } else {
      approve = true;
    }
    if (sending && approve) {
      alert('buying token');
      const receipt = await new Promise(function (resolve, reject) {
        const transfer = NFTContract.methods.buyNFT(account, tokenId);
        const encodedABI = transfer.encodeABI();
        const tx = {
          from: account,
          to: NFTAddress,
          gas: 2000000,
          data: encodedABI
        };
        const tran = web3.eth.sendTransaction(tx);
        tran.on('receipt', receipt => { resolve(receipt); });
        tran.on('error', err => { reject(err) });
      });
      alert('done!');
    } else {
      throw new Error('status error');
    }
  } catch (e) {
    alert('approve failed!');
  } finally {
    sending = false;
    window.location.href = '/';
  }
}
