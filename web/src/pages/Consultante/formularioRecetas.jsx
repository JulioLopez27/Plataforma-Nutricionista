
import { Input } from '~/components'

export function FormularioRecetas() {
    return (

        <>
        <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-gray-900">Recetas sugeridas</h1>
            </div>
        
        
        <form  className="w-full max-w-lg space-y-4">
           
            
            <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>

        </form>
        </>

            
    );



}