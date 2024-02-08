import axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react';
import { Input, Header, NavBar } from '~/components'







export function DetalleConsultante() {
    const [consultanteInfo, setconsultanteInfo] = useState({});
    const [error, setError] = useState(null);
    const [isBotoneraVisible, setIsBotoneraVisible] = useState(false);



    // Función para manejar cambios en los campos de entrada del formulario
    const handleInputChange = (e) => {
        // Extraer el nombre y el valor del campo de entrada que ha cambiado del evento
        const { name, value } = e.target;
        // Actualizar el estado `consultanteInfo` utilizando una función de actualización que recibe el estado anterior (prevconsultanteInfo)
        // y devuelve un nuevo estado que incluye las propiedades anteriores junto con la propiedad que está cambiando (name) y su nuevo valor (value)
        setconsultanteInfo(prevconsultanteInfo => ({
            ...prevconsultanteInfo, // Copia todas las propiedades existentes del estado previo
            [name]: value    // Actualiza la propiedad específica que corresponde al nombre del campo de entrada (name) con su nuevo valor (value)
        }));
    };

    // Definir la función de envío del formulario utilizando Formik
    const formik = useFormik({
        initialValues: consultanteInfo, // Utilizar la información del usuario como valores iniciales del formulario
        onSubmit: async (values) => {

            try {
               /* const res = await axios({
                    method: 'put',
                    baseURL: 'http://localhost:3000',
                    url: '/updateProfileData',
                    data: values  // Enviar los datos modificados al servidor
                });*/

                console.log("🚀 ~ onSubmit: ~ values:", values)
                // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
            } catch (error) {
                // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
                console.error('Error al actualizar el perfil:', error);
            }
        }, 
    });


    return (
        

        <div>
            <Header />
            <NavBar />

            <main className="mt-4 flex flex-wrap items-center justify-center h-full">
                
            <div className="flex flex-col lg:flex-row justify-center items-center h-full"> {/* Contenedor flex para centrar verticalmente */}
    <section id="botoneraConsultante" className="w-full lg:w-1/4 px-4 ml-4 lg:flex-shrink-0"> {/* Añadir lg:flex-shrink-0 para evitar que la botonera se encoja en pantallas grandes */}
        <div className="sticky top-0" >
            {/* Mostrar botonera como desplegable en pantallas pequeñas */}
            <div className="lg:hidden">
                <button onClick={() => setIsBotoneraVisible(!isBotoneraVisible)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full">Mostrar Botonera</button>
                {isBotoneraVisible && (
                    <form onSubmit={formik.handleSubmit} className="space-y-2 bg-white shadow-md rounded-md mt-4"> {/* Estilo para el desplegable en pantallas pequeñas */}
                        <button type="submit" className="block w-full text-left px-4 py-2 hover:bg-gray-200">General</button>
                        <button type="submit" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Anamnesis</button>
                        <button type="submit" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Afecciones</button>
                        <button type="submit" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Informes</button>
                        <button type="submit" className="block w-full text-left px-4 py-2 hover:bg-gray-200">Recetas</button>
                    </form>
                )}
            </div>
            {/* Mostrar botonera fija a la izquierda en pantallas grandes */}
            <div className="hidden lg:block">
                {error ? (
                    <div className="text-red-600">
                        <p>Error al obtener la información del consultante. Por favor, inténtalo de nuevo más tarde.</p>
                        <button onClick={retryFetchconsultanteInfo} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2 w-full">Reintentar</button>
                    </div>
                ) : (
                    consultanteInfo !== null && (
                        <form onSubmit={formik.handleSubmit} className="space-y-2"> {/* Agregar clase de espaciado vertical */}
                            <button type="submit" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">General</button>
                            <button type="submit" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Anamnesis</button>
                            <button type="submit" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Afecciones</button>
                            <button type="submit" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Informes</button>
                            <button type="submit" className="bg-white text-gray-700 hover:bg-gray-300 font-bold py-2 px-4 rounded w-full">Recetas</button>
                        </form>
                    )
                )}
            </div>
        </div>
    </section>

    <section id="detalleConsultante" className="w-full lg:w-3/4 px-4">
        
            {error ? (
                <div>
                    <p>Error al obtener la información del consultante. Por favor, inténtalo de nuevo más tarde.</p>
                    <button onClick={retryFetchconsultanteInfo}>Reintentar</button> {/* Botón para volver a intentar */}
                </div>
            ) : (
                consultanteInfo !== null && (
                    <form onSubmit={formik.handleSubmit} className="w-full max-w-lg space-y-4"> {/* Agregar clase de espaciado vertical y ajustar margen superior */}
                        <Input label="Nombre" name="nombre" value={consultanteInfo.nombre} onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" />
                        <Input label="Apellido" name="apellido" value={consultanteInfo.apellido} onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" />
                        <Input label="Teléfono" name="telefono" value={consultanteInfo.telefono} onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" />
                        <Input label="Sexo" name="sexo" value={consultanteInfo.sexo} onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" />
                        <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>
                    </form>
                )
            )}
       
    </section>
</div>


</main>



        </div>
    );
}