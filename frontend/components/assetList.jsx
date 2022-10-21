
export const AssetList = ({ assetList }) => {

    const handleParticipate = () =>{
        console.log("ahnd")
    }

    return (
        <div>
            {
                assetList.map( () => (
                    <div>
                        <div>{assetList.name}</div>
                        <div>{assetList.ammount}</div>
                        <div>{assetList.owner_id}</div>
                        <div>{assetList.type}</div>
                        <button onClick={handleParticipate}>Comprar activo</button>
                    </div>
                ))
            }
        </div>
    )
}