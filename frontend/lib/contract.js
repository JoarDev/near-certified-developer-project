import nearWallet from "./nearWallet";

const ASSET_CONTRACT_ID = "dev-1666286140101-22068809277940"

class AssetContract {
    contractId;
    wallet;

    constructor({ contractId, walletToUse }) {
      this.contractId = contractId;
      this.wallet = walletToUse;   
    }
  
    getGreeting = async () => {
      return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_greeting' });
    }
  
    setGreeting = async (greeting) => {
      return await this.wallet.callMethod({ contractId: this.contractId, method: 'set_greeting', args: { greeting: greeting } });
    }

    addAsset = async (methodArgs) => {
      console.log(this)
      return await this.wallet.callMethod({ contractId: this.contractId, method: 'set_add_asset', args: methodArgs });
    }
  }


export const assetContract = new AssetContract({ contractId: ASSET_CONTRACT_ID, walletToUse: nearWallet})