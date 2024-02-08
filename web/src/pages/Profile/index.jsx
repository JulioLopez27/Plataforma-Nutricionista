import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useEffect, useState } from 'react';

import { Input, Header, NavBar } from '~/components'


const validationSchema = yup.object().shape({
    email: yup.string().required('Campo obligatorio').email('Ingrese un formato valido').trim(),
    password: yup.string().required('Campo obigatorio').trim()
})





export function Profile() {
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    useEffect(() => {
        // Obtener la información del usuario del servidor al cargar el componente
        async function fetchUserInfo() {
            try {
                const res = await axios({
                    method: "GET",
                    baseURL: 'http://localhost:3000',
                    url: '/getProfileData'
                });
                console.log(res.data);
                setUserInfo(res.data);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
                setError(error);
            }
        }

        // Realizar una nueva solicitud solo si aún no se ha alcanzado el límite máximo de intentos
        if (retryCount < maxRetries) {
            fetchUserInfo();
            setRetryCount(retryCount + 1);
        }
    }, [retryCount]); // Reintentar la solicitud cada vez que el contador de intentos cambie

    // Función para volver a intentar obtener los datos del usuario
    const retryFetchUserInfo = () => {
        setRetryCount(0); // Reinicia el contador de intentos
        setError(null); // Reinicia el estado de error
    };

    // Función para manejar cambios en los campos de entrada del formulario
    const handleInputChange = (e) => {
        // Extraer el nombre y el valor del campo de entrada que ha cambiado del evento
        const { name, value } = e.target;
        // Actualizar el estado `userInfo` utilizando una función de actualización que recibe el estado anterior (prevUserInfo)
        // y devuelve un nuevo estado que incluye las propiedades anteriores junto con la propiedad que está cambiando (name) y su nuevo valor (value)
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo, // Copia todas las propiedades existentes del estado previo
            [name]: value    // Actualiza la propiedad específica que corresponde al nombre del campo de entrada (name) con su nuevo valor (value)
        }));
    };

    // Definir la función de envío del formulario utilizando Formik
    const formik = useFormik({
        initialValues: userInfo, // Utilizar la información del usuario como valores iniciales del formulario
        onSubmit: async (values) => {

            try {
                const res = await axios({
                    method: 'put',
                    baseURL: 'http://localhost:3000',
                    url: '/updateProfileData',
                    data: values  // Enviar los datos modificados al servidor
                });
                console.log("🚀 ~ onSubmit: ~ values:", values)
                // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
            } catch (error) {
                // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
                console.error('Error al actualizar el perfil:', error);
            }
        }, validationSchema
    });

    return (
        <div>
            <Header />
            <NavBar />
            <main className='mt-4'>
                <section id="editPerfil" className='container' >
                    <div className='flex justify-center items-center'>
                        {error ? (
                            <div>
                                <p>Error al obtener la información del usuario. Por favor, inténtalo de nuevo más tarde.</p>
                                <button onClick={retryFetchUserInfo}>Reintentar</button> {/* Botón para volver a intentar */}
                            </div>
                        ) : (userInfo !== null &&
                            <form onSubmit={formik.handleSubmit}>
                                <Input label='Nombre' name='nombre' value={userInfo.nombre} onChange={handleInputChange} />
                                <button type="submit">Guardar cambios</button>
                            </form>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
