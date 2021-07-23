async function getDetailToken (tokenId) {
  const owner = await ownerOf(tokenId);
  const buttonDiv = (owner.toLowerCase() == account.toLowerCase()) ? `<a class="primaryBtn sendBtn" onclick="sendNFT('${tokenId}')">Send to wallet</a>` : `<a class="primaryBtn showBtn" onclick="buyNFT('${tokenId}')">BUY NOW</a>`;
  const URI = await getTokenURI(tokenId);
  const JSONURI = await tryJSON(URI) ? JSON.parse(URI) : null;
  const img = JSONURI ? JSONURI.img : 'http://fakeimg.pl/550x550/gg';
  const price = await getTokenPrice(tokenId);
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="imgFrame detailImg">
      <img src="${img}" onerror="this.onerror=null;this.src='./images/default.png';">
    </div>    
    <div class="info">
      <h1 class="title">ID: ${tokenId} - ${JSONURI ? JSONURI.name : URI}</h1>
      <div class="avatar">
        <div class="avatarBg">
          <img src="http://fakeimg.pl/20x20" onerror="this.onerror=null;this.style='display:none;';this.parentNode.style='background-color: black;'">
        </div>
        <p class="avatarName">Official</p>
      </div>
      <div class="currentPrice">
        <div class="price">
          <p>Current Price:</p>
          <p>${price} OFCL</p>
        </div>
  ` + buttonDiv +
    `      
      </div>
      <p class="description">${JSONURI.remark || ''}</p>
    </div>
  `
  let elements = document.getElementsByClassName('detail')[0];
  elements.appendChild(div);
}

async function getSellingNFTWithout (disableId) {
  const balance = await new Promise(function (resolve, reject) {
    NFTContract.methods.balanceOf(NFTAddress).call((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
  for (let i = 0; i < balance; i++) {
    const tokenId = await tokenOfOwnerByIndex(NFTAddress, i);
    if (tokenId == disableId) {
      continue;
    }
    const URI = await getTokenURI(tokenId)
    const JSONURI = await tryJSON(URI) ? JSON.parse(URI) : null;
    const img = JSONURI ? JSONURI.img : 'http://fakeimg.pl/285x285/gg'
    const price = await getTokenPrice(tokenId);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="item">
      <a class="imgFrame itemImg" href="./detail.html?tokenId=${tokenId}">
        <img src="${img}" alt="Image not found" onerror="this.onerror=null;this.src='./images/default.png';">
      </a>    
      <div class="itemInfo">
        <h2 class="itemTitle">${JSONURI.name || URI}</h2>
        <div class="avatar">
          <div class="avatarBg">
            <img src="http://fakeimg.pl/20x20/gg" onerror="this.onerror=null;this.style='display:none;';this.parentNode.style='background-color: black;'">
          </div>
          <p class="avatarName">Official</p>
        </div>
      </div>
      <div class="priceInfo">
        <div class="price">
          <p>Price:</p>
          <p>${price} OFCL</p>
        </div>
        <a class="primaryBtn" onclick="buyNFT('${tokenId}')">BUY NOW</a>
      </div>
    </div>
    `
    let elements = document.getElementsByClassName('itemList')[0];
    elements.appendChild(div);
  }
}

async function main () {
  const urlParams = new URLSearchParams(window.location.search);
  let tokenId = urlParams.get('tokenId');
  getDetailToken(tokenId);
  getSellingNFTWithout(tokenId);
}

main();


