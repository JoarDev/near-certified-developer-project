import { useState } from "react"
import { assetContract } from "../lib/contract"

export const AssetList = ({ assetList, userId }) => {
    const [value, setValue] = useState(null)

    const handleParticipate = (uuid) =>{
        assetContract.setBuyAsset({buyer_name: userId, asset_uuid: uuid})
    }

    const handleGetOwners = (uuid) => {
        assetContract.getBuyersAssets({uuid: uuid})
        .then((body) => {
            setValue(body)
            console.log()
        })
    }

    return (
        <div>
            <h4>Lista de activos</h4>
            <div style={{display: 'flex', flexDirection: 'row', gap: 20, paddingBottom: 40}}>
            {
                assetList.map( (value) => (
                    <div key={value.uuid}>
                        <div>Nombre: {value.name}</div>
                        <div>Monto. {value.ammount}</div>
                        <div>Dueño: {value.owner_id}</div>
                        <div>Tipo: {value.type}</div>
                        <button onClick={() => handleParticipate(value.uuid)} style={{marginRight: 10}}>Comprar activo</button>
                        <button onClick={() => handleGetOwners(value.uuid)}>Ver compradores</button>
                    </div>
                ))
            }
            </div>
            {
                value != null ? (
                    <div>
                        <h4>Compradores del activo:</h4>
                        <div style={{display: 'flex', flexDirection: 'row', gap: 20, paddingBottom: 40}}>
                        {
                            value.map((buyer) => (
                                <div>
                                    <div>Nombre: {buyer.name}</div>
                                    <div>Cuenta: {buyer.address}</div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}