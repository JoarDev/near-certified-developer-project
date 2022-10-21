import { assetContract } from "../lib/contract"

export const AssetList = ({ assetList, userId }) => {

    const handleParticipate = (uuid) =>{
        assetContract.setBuyAsset({asset_uuid: uuid, buyer_name: userId})
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
                        <button onClick={() => handleParticipate(value.uuid)}>Comprar activo</button>
                    </div>
                ))
            }
            </div>
        </div>
    )
}