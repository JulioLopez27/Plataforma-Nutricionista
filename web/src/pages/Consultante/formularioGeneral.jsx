
import { Input } from '~/components'
import { useEffect, useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    nombre: yup.string().required('Campo obligatorio'),
    apellido: yup.string().required('Campo obligatorio'),
    telefono: yup.string()
        .min(9, 'El número de teléfono debe tener al menos 9 dígitos')
        .max(15, 'El número de teléfono tiene un máximo de 15 dígitos')
        .matches(/^[0-9]*$/, 'El número de teléfono solo puede contener números'),
    sexo: yup.string().required('Campo obligatorio'),

})



export function FormularioGeneral() {
    const navigate = useNavigate()
    const [auth] = useLocalStorage('auth', {})
    const [data, setData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    //didMount-> se usa para el useEffect no haga solicitudes http duplicadas
    const [didMount, setDidMount] = useState(false)

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const idConsultante = urlParams.get('id')



    //setear los datos al hacer la llamada http
    const initialValues = useMemo(() => ({
        nombre: isLoaded ? data.nombre : '',
        apellido: isLoaded ? data.apellido : '',
        fechaNacimiento: isLoaded ? data.fechaNacimiento : '',
        sexo: isLoaded ? data.sexo : '',
        telefono: isLoaded ? data.telefono : ''
    }), [isLoaded, data])


    const formik = useFormik({
        //se carga los datos al crear el formulario
        initialValues: initialValues,
        // onSubmit: async (values) => {
        //     try {
        //         const res = await axios({
        //             method: 'PUT',
        //             baseURL: import.meta.env.VITE_API_URL,
        //             url: '/TODO',
        //             data: values,
        //             headers: { Authorization: `Bearer ${auth.accesToken}` }
        //         })
        //         console.log("🚀 ~ onSubmit: ~ res:", res)
        //     } catch (error) {
        //         console.log("🚀 ~ onSubmit: ~ error:", error)
        //     }
        // }, validationSchema
    })

    // Custom hook para la consulta al cargar la página
    const fetchData = async () => {
        try {
            const user_data = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/detalleConsultante',
                data: { id_consultante: idConsultante },
                headers: { Authorization: `Bearer ${auth.accesToken}` }
            })

            setData(user_data)
            setIsLoaded(true)
            formik.setValues({
                nombre: user_data.data.nombre,
                apellido: user_data.data.apellido,
                fechaNacimiento: user_data.data.fechaNacimiento,
                sexo: user_data.data.sexo,
                telefono: user_data.data.telefono
            })
        } catch (error) {
            setIsLoaded(false)
            console.log(error);
        }
    }
    //se ejecuta al cargar la pagina
    useEffect(() => {
        setDidMount(true)
        if (auth?.user?.id) {
            if (didMount) {
                fetchData().catch((error) => {
                    console.error('Error al obtener la información del usuario:', error)
                    setError(error)
                })
            }
        } else {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, navigate, didMount])

    const retryFetchUserInfo = () => {
        setError(null); // Reinicia el estado de error
        fetchData(data, setIsLoaded).catch((error) => {
            console.error('Error al obtener la información del usuario:', error);
            setError(error);
        });
    }
    
    return (
        <>
        <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-gray-900">Datos personales</h1>
            </div>
            <main>
                {error ? (
                    <div>
                        <p>Error al obtener la información del usuario. Por favor, inténtalo de nuevo más tarde.</p>
                        <button onClick={retryFetchUserInfo}>Reintentar</button> {/* Botón para volver a intentar */}
                    </div>
                ) : isLoaded ? (
                    <form className="w-full max-w-lg space-y-4" onSubmit={formik.handleSubmit}>
                        <Input htmlFor="nombre" id="nombre" label="Nombre" name="nombre" value={formik.values.nombre} onChange={formik.handleChange} error={formik.touched.nombre && formik.errors.nombre} onBlur={formik.handleBlur} />
                        <Input htmlFor="apellido" id="apellido" label="Apellido" name="apellido" value={formik.values.apellido} onChange={formik.handleChange} error={formik.touched.apellido && formik.errors.apellido} onBlur={formik.handleBlur} />
                        <Input htmlFor="fechaNacimiento " id="fechaNacimiento" type="string" label="fecha nacimiento" name="fechaNacimiento" value={formik.values.fechaNacimiento} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <Input htmlFor="telefono" id="telefono" label="Teléfono" name="telefono" value={formik.values.telefono} onChange={formik.handleChange} error={formik.touched.telefono && formik.errors.telefono} onBlur={formik.handleBlur} />
                        <Input htmlFor="sexo" id="sexo" label="Sexo" name="sexo" value={formik.values.sexo} onChange={formik.handleChange} error={formik.touched.sexo && formik.errors.sexo} onBlur={formik.handleBlur} />

                        <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2 disabled:opacity-80 " disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? 'Guardando sus modificaciones' : 'Guardar cambios'}
                        </button>
                    </form>
                ) : (<p>Cargando...</p>)}
            </main>
        </>
    );
}