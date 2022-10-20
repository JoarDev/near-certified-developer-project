import { NearBindgen, near, call, view, UnorderedMap } from 'near-sdk-js';
// import {v4 as uuidv4} from 'uuid';

class AssetInfo {
  uuid: string = "";
  name: string = "";
  type: string = "";
  ammount: number = 0;
  owner_id: string = "";
}
class BuyerInfo {
  address: string = "";
  name: string = "";
}

@NearBindgen({})
class Asset {
  assets: UnorderedMap = new UnorderedMap("assets");
  buyers: UnorderedMap = new UnorderedMap("buyers");

  @view({})
  get_owner_assets({uuid}: { uuid : string}): string {
    near.log('Direccion ' + uuid)
    near.log(JSON.stringify(this.assets.get(uuid)))
    return JSON.stringify(this.assets.get(uuid))
  }
  @view({})
  get_assets(): string {
    near.log('Get assets')
    return JSON.stringify(this.assets);
  }
  @view({})
  get_buyers_asset({uuid}: { uuid : string}): string {
    near.log('Direccion ' + uuid)
    near.log(JSON.stringify(this.buyers.get(uuid)))
    return JSON.stringify(this.buyers.get(uuid))
  }


  @call({}) // This method changes the state, for which it cost gas
  set_add_asset({ asset_name, asset_type, asset_ammount }: { asset_name: string, asset_type: string, asset_ammount: number }): AssetInfo {
    const player = near.predecessorAccountId();
    near.log(`El usuario es ${player}`);

    let newUUID = Math.floor(100000 + Math.random() * 900000).toString();
    near.log(`UUID = `+newUUID);
    let info = new AssetInfo()
    info.uuid = newUUID
    info.name = asset_name
    info.type = asset_type
    info.ammount = asset_ammount
    info.owner_id = player
    near.log(`InfoAsset = `+JSON.stringify(info));

    this.assets.set(newUUID, info)
    return info
  }

  @call({}) // This method changes the state, for which it cost gas
  set_buy_asset({ asset_uuid, buyer_name }: { asset_uuid: string, buyer_name: string }): BuyerInfo {
    const player = near.predecessorAccountId();
    near.log(`El usuario comprador es ${player}`);

    let infoBuyer = new BuyerInfo()
    infoBuyer.address = player
    infoBuyer.name = buyer_name
    near.log(`InfoAsset = `+JSON.stringify(infoBuyer));

    this.buyers.set(asset_uuid, infoBuyer)
    return infoBuyer
  }
}