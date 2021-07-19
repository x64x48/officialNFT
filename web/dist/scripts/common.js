var popup = document.querySelector(".sendPopup");
var popup_form = document.querySelector(".sendForm");
var popup_btns = document.querySelectorAll("a.sendBtn");
var cancel_btn = document.querySelector(".cancelBtn");
var send_btn = document.querySelector(".sendBtn");
var connect_btn = document.querySelectorAll("a.connectWallet")[0];
var connect_addr = document.querySelectorAll("a.connectWalletAddress")[0];
var my_nft = document.querySelectorAll("a.mynfts")[0];
let storage = window.localStorage
// var link_details = document.querySelectorAll("a.link-detail");

//出現 popup
for (var i = 0; i < popup_btns.length; i++) {
  popup_btns[i].addEventListener("click", function () {
    popup.setAttribute('style', 'display:flex');
    popup_form.querySelector("#wallectAddress").focus();
  });
}

let account = storage.getItem('connect') || '';

if (!account) {
  connect_btn.addEventListener("click", async function () {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length < 0) {
      console.log('Should choose at least one account.');
      return;
    }
    account = accounts[0];
    console.log(account);
    connect_addr.textContent = account.substr(0, 16);
    connect_addr.classList.toggle('show-inline');
    connect_btn.classList.toggle('hidden');
    my_nft.classList.toggle('show-inline');
    storage.setItem('connect', account);
  });
} else {
  connect_addr.textContent = account.substr(0, 16);
  connect_addr.classList.toggle('show-inline');
  connect_btn.classList.toggle('hidden');
  my_nft.classList.toggle('show-inline');
}

window.ethereum.on('accountsChanged', function (accounts) {
  if (accounts.length > 0) {
    account = accounts[0];
  } else {
    account = undefined;
    storage.clear();
    window.location.href= '/';
  }
})

connect_addr.addEventListener("click", async function () {
  storage.clear();
  window.location.href= '/';
});

// for (var i=0; i<link_details.length; i++) {
//   link_details[i].addEventListener("click", function (e) {
//     e.preventDefault();
//     history.pushState({}, 'Detail - #///', 'detail.html');
//   });
// }

//取消 popup
cancel_btn.addEventListener("click", function () {
  popup.setAttribute('style', 'display:none');
  popup_form.reset();
});

//發送表單
send_btn.addEventListener("click", function () {
//   //ajax

//   // have to use display:flex to show the modal
//   popup.setAttribute('style', 'display:flex');
//   popup_form.reset();
});

let sendingTokenId;

async function sendNFT (tokenId) {
  sendingTokenId = tokenId
  popup.setAttribute('style', 'display:flex');
  popup_form.reset();
}
