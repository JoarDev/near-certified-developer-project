import nearWallet from "./nearWallet";
import { v4 as uuidv4 } from 'uuid';

const ASSET_CONTRACT_ID = "dev-1666371293170-20688840778139"

class AssetContract {
    contractId;
    wallet;

    constructor({ contractId, walletToUse }) {
      this.contractId = contractId;
      this.wallet = walletToUse;   
    }
  
    getAssets = async () => {
      return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_assets' });
    }
  
    setBuyAsset = async (methodArgs) => {
      return await this.wallet.callMethod({ contractId: this.contractId, method: 'set_buy_asset', args: methodArgs });
    }

    addAsset = async (methodArgs) => {
      const newArgs = {
        ...methodArgs,
        uuid: uuidv4(),
      }
      return await this.wallet.callMethod({ contractId: this.contractId, method: 'set_add_asset', args: newArgs });
    }

    getBuyersAssets  = async (methodArgs) => {
      return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_buyers_asset', args: methodArgs });
    }
  }


export const assetContract = new AssetContract({ contractId: ASSET_CONTRACT_ID, walletToUse: nearWallet})