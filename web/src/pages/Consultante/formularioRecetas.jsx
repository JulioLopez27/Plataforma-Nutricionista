import React from 'react';
import { Input } from '~/components'

export function FormularioRecetas({ userInfo, handleInputChange, formik }) {
    return (

        
        <form  className="w-full max-w-lg space-y-4">
           
            
            <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>

        </form>


            
    );



}