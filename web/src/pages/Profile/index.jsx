import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useCallback, useEffect, useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'

import { Input, Custom_select, Header, NavBar } from '~/components'

const validationSchema = yup.object().shape({
    nombre: yup.string().required('Campo obligatorio'),
    apellido: yup.string().required('Campo obligatorio'),
    telefono: yup.string()
        .min(9, 'El número de teléfono debe tener al menos 9 dígitos')
        .max(15, 'El número de teléfono tiene un máximo de 15 dígitos')
        .matches(/^[0-9]*$/, 'El número de teléfono solo puede contener números'),
    email: yup.string().email().required('Campo obligatorio'),
    especialidad: yup.number().integer().required('Campo obligatorio'),
    anos_experiencia: yup.number()
        .min(0, 'Solo se aceptan valores positivos')
        .max(70, 'Maximo valor que puede ingresar')
        .required('Campo obligatorio'),
    pais: yup.number().integer().required('Campo obligatorio'),
    ciudad: yup.string().required('Campo obligatorio'),
})

const fetchData = async (url) => {
    const res = await axios({
        method: 'GET',
        baseURL: 'http://localhost:3000',
        url: url,
    })
    return res.data;
}

export function Profile() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [countries, setCountries] = useState([])
    const [specialties, setSpecialties] = useState([])

    const [auth] = useLocalStorage('auth', {})

    useEffect(() => {
        if (!auth?.user?.id) {
            navigate('/')
        }
    })

    const fetchUserInfo = useCallback(async () => {
        try {
            const dataUser = await fetchData('/getProfileData');
            setUserInfo(dataUser)
        } catch (error) {
            console.error('Error al obtener la información del usuario:', error)
            setError(error);
        } finally {
            setIsLoaded(true)
        }
    }, [])

    const fetchSpecialty = useCallback(async () => {
        const data = await fetchData('/getSpecialty');
        setSpecialties(data);
    }, [])

    const fetchCountries = useCallback(async () => {
        const data = await fetchData('/getCountries');
        setCountries(data);
    }, [])



    useEffect(() => {
        // Realizar las solicitudes HTTP de manera concurrente
        Promise.all([fetchUserInfo(), fetchSpecialty(), fetchCountries()]);
    }, [fetchUserInfo, fetchSpecialty, fetchCountries]);


    // Función para volver a intentar obtener los datos del usuario
    const retryFetchUserInfo = () => {
        setError(null); // Reinicia el estado de error
        fetchUserInfo(); // Reinicia la solicitud
    }

    const initialValues = useMemo(() => ({
        nombre: isLoaded ? userInfo.nombre : '',
        apellido: isLoaded ? userInfo.apellido : '',
        email: isLoaded ? userInfo.email : '',
        telefono: isLoaded ? userInfo.telefono : '',
        anos_experiencia: isLoaded ? userInfo.anos_experiencia : '',
        especialidad: isLoaded ? userInfo.especialidad : '',
        pais: isLoaded ? userInfo.pais : '',
        ciudad: isLoaded ? userInfo.ciudad : ''
    }), [isLoaded, userInfo]);

    // Definir la función de envío del formulario utilizando Formik
    const formik = useFormik({
        initialValues: initialValues,
        // Utilizar la información del usuario como valores iniciales del formulario,
        onSubmit: async (values) => {
            try {
                const res = await axios({
                    method: 'put',
                    baseURL: 'http://localhost:3000',
                    url: '/updateProfileData',
                    data: values  // Enviar los datos modificados al servidor
                })

                // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
            } catch (error) {
                // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
                console.error('Error al actualizar el perfil:', error);
            }
        }
    }
    )

    useEffect(() => {
        if (isLoaded) {
            formik.setValues({
                nombre: userInfo.nombre,
                apellido: userInfo.apellido,
                email: userInfo.email,
                telefono: userInfo.telefono,
                anos_experiencia: userInfo.anos_experiencia,
                especialidad: userInfo.especialidad,
                pais: userInfo.pais,
                ciudad: userInfo.ciudad
            });
        }
    }, [isLoaded, userInfo]);



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
                        ) : isLoaded ? (
                            <form onSubmit={formik.handleSubmit}>
                                <Input label='Nombre' name='nombre' value={formik.values.nombre} onChange={formik.handleChange} />
                                <Input label='Apellido' name='apellido' value={formik.values.apellido} onChange={formik.handleChange} />
                                <Input label='Email' name='email' value={formik.values.email} onChange={formik.handleChange} />
                                <Input label='Telefono' name='telefono' value={formik.values.telefono} onChange={formik.handleChange} />
                                <Input label='Años de experiencia' name='anos_experiencia' value={formik.values.anos_experiencia} onChange={formik.handleChange} />
                                <Custom_select htmlFor='espescialidad' id='especialidad' type='number' label='Especialidad' name='especialidad' placeholder="Ingrese su especialidad" value={formik.values.especialidad} onChange={formik.handleChange} options={specialties} initialValue={userInfo.especialidad} />
                                <Custom_select htmlFor='pais' id='pais' type='number' label='Pais' name='pais' placeholder="Ingrese su pais" value={formik.values.pais} onChange={formik.handleChange} options={countries} initialValue={userInfo.pais} />

                                <Input label='Ciudad' name='ciudad' value={formik.values.ciudad} onChange={formik.handleChange} />

                                <div className="flex flex-col text-center gap-4 text-white my-4">
                                    <button type="submit" className=' p-2 bg-verde_oscuro rounded-xl border'>Guardar cambios</button>
                                </div>
                            </form>
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
