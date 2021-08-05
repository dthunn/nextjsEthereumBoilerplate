import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // In the browser and metamask is
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: 'eth_requestAccounts' });
} else {
  // SSR or not running metamask
  const provider = new Web3.providers.HttpProvider(process.env.PROVIDER_URL);
  web3 = new Web3(provider);
}

export default web3;
