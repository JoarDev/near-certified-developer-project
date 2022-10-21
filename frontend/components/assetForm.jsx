import { useForm } from "react-hook-form";
import { assetContract } from "../lib/contract";

export const AssetForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (values) => {
        console.log("values",values)
        assetContract.addAsset({
            asset_name: values.assetName,
            asset_type: values.assetType,
            asset_ammount: values.amount,
        })
    }

    return (
        <form className="assetForm" onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nombre del activo:{" "}
                <input type="text" placeholder="Asset name" {...register("assetName")} />
            </label>
            <label>
                Tipo de activo:{" "}
                <select {...register("assetType")}>
                    <option value="none" selected>Seleccione</option>
                    <option value="vehiculo">Vehiculo</option>
                    <option value="inmueble">Inmueble</option>
                    <option value="otro">Otro</option>
                </select>
            </label>
            <label>
                Monto total:{" "}
                <input type="number" placeholder="10 NEAR" {...register("amount")} />
            </label>
            <input value="Registrar activo" type="submit" />
        </form>
    )
}