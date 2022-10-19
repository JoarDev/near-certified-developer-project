/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class HelloNEAR {
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
  }