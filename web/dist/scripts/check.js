var isMetamask = false;
if (typeof window.ethereum !== 'undefined') {
  isMetamask = true
  console.log('MetaMask is installed!');
}
