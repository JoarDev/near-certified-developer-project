import { useForm } from "react-hook-form";

export const AssetForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (values) => {
        console.log("values",values)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nombre del activo
                <input type="text" placeholder="Asset name" {...register("assetName")} />
            </label>
            <label>
                Tipo de activo
                <select default {...register("assetType")}>
                    <option value="none" selected>Seleccione</option>
                    <option value="vehiculo">Vehiculo</option>
                    <option value="inmueble">Inmueble</option>
                    <option value="otro">Otro</option>
                </select>
            </label>
            <label>
                Monto total
                <input type="number" placeholder="10 NEAR" {...register("Amount")} />
            </label>
            <input type="submit" />
        </form>
    )
}