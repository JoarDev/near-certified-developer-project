import { NearBindgen, near, call, view, UnorderedMap } from 'near-sdk-js';

class AssetInfo {
  uuid: string = "";
  name: string = "";
  type: string = "";
  ammount: number = 0;
  owner_id: string = "";
}
class BuyerInfo {
  uuid: string = "";
  address: string = "";
  name: string = "";
}

function betweenRandomNumber(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

@NearBindgen({})
class Asset {
  assets = [];
  buyers = [];

  @view({})
  get_assets(): any [] {
    // near.log('Get assets')
    return this.assets;
  }
  
  @view({})
  get_buyers(): any [] {
    // near.log('Get buyers')
    return this.buyers;
  }
  @view({})
  get_buyers_asset({uuid}: { uuid : string}): any [] {
    // near.log('Direccion ' + uuid)
    const buyers_return = [];
    this.buyers.forEach(function (item) {
      if (item.uuid == uuid) {
        buyers_return.push(item);
      }
    });
    // near.log(JSON.stringify(buyers_return))
    return buyers_return
  }


  @call({}) // This method changes the state, for which it cost gas
  set_add_asset({ asset_name, asset_type, asset_ammount }: { asset_name: string, asset_type: string, asset_ammount: number }): AssetInfo {
    const player = near.predecessorAccountId();
    // near.log(`El usuario es ${player}`);

    let newUUID = betweenRandomNumber(1000000000, 9999999999).toString()
    near.log(`UUID = `+newUUID);
    let info = new AssetInfo()
    info.uuid = newUUID
    info.name = asset_name
    info.type = asset_type
    info.ammount = asset_ammount
    info.owner_id = player
    near.log(`InfoAsset = `+JSON.stringify(info));

    this.assets.push(info)
    return info
  }

  @call({}) // This method changes the state, for which it cost gas
  set_buy_asset({ asset_uuid, buyer_name }: { asset_uuid: string, buyer_name: string }): BuyerInfo {
    const player = near.predecessorAccountId();
    // near.log(`El usuario comprador es ${player}`);

    let infoBuyer = new BuyerInfo()
    infoBuyer.uuid = asset_uuid
    infoBuyer.address = player
    infoBuyer.name = buyer_name
    // near.log(`InfoAsset = `+JSON.stringify(infoBuyer));

    this.buyers.push(infoBuyer)
    return infoBuyer
  }
}