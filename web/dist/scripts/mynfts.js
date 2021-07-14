async function main () {
  const balance = await new Promise(function (resolve, reject) {
    NFTContract.methods.balanceOf(account).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
  for (let i = 0; i < balance; i++) {
    const tokenId = await new Promise(function (resolve, reject) {
      NFTContract.methods.tokenOfOwnerByIndex(account, i).call((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    const URI = await getTokenURI(tokenId)
    const JSONURI = await tryJSON(URI) ? JSON.parse(URI) : null;
    const img = JSONURI ? JSONURI.img : 'http://fakeimg.pl/285x285/gg'
    const price = await getTokenPrice(tokenId);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="item">
      <a class="imgFrame itemImg" href="./detail.html?tokenId=${tokenId}">
        <img src="${img}" onerror="this.onerror=null;this.src='./images/default.png';">
      </a>    
      <div class="itemInfo">
        <h2 class="itemTitle">ID: ${tokenId} - ${JSONURI ? JSONURI.name : URI}</h2>
        <div class="avatar">
          <div class="avatarBg">
            <img src="http://fakeimg.pl/20x20/gg" onerror="this.onerror=null;this.style='display:none;';this.parentNode.style='background-color: black;'">
          </div>
          <p class="avatarName">icarusdjr</p>
        </div>
      </div>
      <div class="priceInfo">
        <div class="price">
          <p>Price:</p>
          <p>${price} OFCL</p>
        </div>
        <a class="primaryBtn sendBtn" onclick="sendNFT(${tokenId})">Send to wallet</a>
      </div>
    </div>
    `
    let elements = document.getElementsByClassName('itemList')[0];
    elements.appendChild(div);
  }
}

main();
