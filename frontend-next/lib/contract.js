import nearWallet from "./nearWallet";

const ASSET_CONTRACT_ID = "dev-1666367940051-78097078193014"

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
      console.log(this)
      return await this.wallet.callMethod({ contractId: this.contractId, method: 'set_add_asset', args: methodArgs });
    }
  }


export const assetContract = new AssetContract({ contractId: ASSET_CONTRACT_ID, walletToUse: nearWallet})