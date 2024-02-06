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
    const [userInfo, setUserInfo] = useState({})
    const [error, setError] = useState(null)
    const [retryCount, setRetryCount] = useState(0)
    const maxRetries = 3 // Establece el número máximo de intentos de solicitud


    useEffect(() => {
        // Obtener la información del usuario del servidor al cargar el componente
        async function fetchUserInfo() {
            try {
                const res = await axios({
                    method: "GET",
                    baseURL: 'http://localhost:3000',
                    url: '/getProfileData'
                }) // Suponiendo que esta ruta obtiene la información del usuario
                setUserInfo(res.data)
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error)
                setError(error)
            }
        }

        // Realiza una nueva solicitud solo si aún no se ha alcanzado el límite máximo de intentos
        if (retryCount < maxRetries) {
            fetchUserInfo()
            setRetryCount(retryCount + 1)
        }
    }, [retryCount]) // Reintentar la solicitud cada vez que el contador de intentos cambie


    // Función para volver a intentar obtener los datos del usuario
    const retryFetchUserInfo = () => {
        setRetryCount(0); // Reinicia el contador de intentos
        setError(null); // Reinicia el estado de error
    };



    // Definir la función de envío del formulario utilizando Formik
    const formik = useFormik({
        initialValues: userInfo, // Utilizar la información del usuario como valores iniciales del formulario
        onSubmit: async (values) => {
            try {
                const res = await axios.put('/api/profile', values); // Enviar los datos modificados al servidor
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
                    <div className='flex flex-col justify-center items-center'>
                        {error ? (

                            <div>
                                <p>Error al obtener la información del usuario. Por favor, inténtalo de nuevo más tarde.</p>
                                <button onClick={retryFetchUserInfo}>Reintentar</button> {/* Botón para volver a intentar */}
                            </div>
                        ) : (
                            <form onSubmit={formik.handleSubmit}>
                                {Object.keys(userInfo).map((key) => (
                                    <Input key={key} name={key} value={formik.values[key]} onChange={formik.handleChange} />
                                ))}
                                <button type="submit">Guardar cambios</button>
                            </form>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}