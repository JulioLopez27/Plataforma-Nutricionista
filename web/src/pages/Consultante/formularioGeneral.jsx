import React from 'react';
import { Input } from '~/components'

export function FormularioGeneral({ userInfo, handleInputChange, formik }) {
    return (
        <form  className="w-full max-w-lg space-y-4">
            <Input label="Nombre" name="nombre" value="Juan" onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Apellido" name="apellido" value="Perez" onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Teléfono" name="telefono" value="132496865" onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Sexo" name="sexo" value="Masculino" onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>
        </form>
    );
}

//export default FormularioGeneral;
