import web3 from './web3';
import { abi } from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  abi,
  '0x8C7df4c2AF7EDEF1EAf5fd30796C116fA463A780'
);

export default instance;
