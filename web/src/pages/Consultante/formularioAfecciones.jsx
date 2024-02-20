import { Input } from '~/components'
import { useEffect, useState, useMemo } from 'react';
import { useLocalStorage } from 'react-use'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useFormik } from 'formik'
import * as yup from 'yup'

export function FormularioAfecciones() {

    const navigate = useNavigate()
    const [auth] = useLocalStorage('auth', {})
    const [data, setData] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null)
    //didMount-> se usa para el useEffect no haga solicitudes http duplicadas
    const [didMount, setDidMount] = useState(false)
    const [afeccionesID, setAfeccionesId] = useState(null); 
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const idConsultante = urlParams.get('id')


    const initialValues = useMemo(() => ({
        idConsultante: parseInt(idConsultante),
        diabetes_tipo_1: isLoaded ? data.diabetes_tipo_1 : false,
        diabetes_tipo_2: isLoaded ? data.diabetes_tipo_2 : false,
        celiaquismo: isLoaded ? data.celiaquismo : false,
        hipertension: isLoaded ? data.hipertension : false,
        alergias: isLoaded ? data.alergias : '',
        enfermedad_renal: isLoaded ? data.enfermedad_renal : false,
        hipercolesterolemia: isLoaded ? data.hipercolesterolemia : false,
        anemia: isLoaded ? data.anemia : false,
        obesidad: isLoaded ? data.obesidad : false,


    }), [isLoaded, data]);


    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            try {
                const res = await axios({
                    method: 'PUT',
                    baseURL: import.meta.env.VITE_API_URL,
                    url: '/detalleConsultante/updateAfecciones',
                    data: {afeccionesID,values},
                    headers: { Authorization: `Bearer ${auth.accesToken}`,}
                })
                console.log("🚀 ~ onSubmit: ~ res:", res)
                alert("Cambios realizados con exito!")
            } catch (error) {
                console.log("🚀 ~ onSubmit: ~ error:", error)
                alert("No se pudieron realizar los cambios")
            }
        }, //validationSchema
    }
    )
    const fetchData = async () => {
        try {
            const user_data = await axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/detalleConsultante/afecciones', // Cambiar la URL a la correspondiente para afección
                data: { id_consultante: idConsultante },
                headers: { Authorization: `Bearer ${auth.accesToken}` }
            });

            setData(user_data.data);
            setIsLoaded(true);
            setAfeccionesId(user_data.data.id_afecciones)

            formik.setValues({
                diabetes_tipo_1: user_data.data.diabetes_tipo_1,
                diabetes_tipo_2: user_data.data.diabetes_tipo_2,
                celiaquismo: user_data.data.celiaquismo,
                hipertension: user_data.data.hipertension,
                alergias: user_data.data.alergias,
                enfermedad_renal: user_data.data.enfermedad_renal,
                hipercolesterolemia: user_data.data.hipercolesterolemia,
                anemia: user_data.data.anemia,
                obesidad: user_data.data.obesidad,
                idConsultante: idConsultante
            });

            //console.log("FORMIK " + formik.values.anemia);

        } catch (error) {
            setIsLoaded(false);
            console.log(error);
        }
    };

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


    return (
        <>
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold text-gray-900">Afecciones</h1>
            </div>


            <form onSubmit={formik.handleSubmit} className="max-w-lg space-y-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="diabetes_tipo_1"
                        name="diabetes_tipo_1"
                        checked={formik.values.diabetes_tipo_1}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="diabetes_tipo_1" className="text-gray-700">Diabetes Tipo 1</label>
                </div>
            
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="diabetes_tipo_2"
                        name="diabetes_tipo_2"
                        checked={formik.values.diabetes_tipo_2}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="diabetes_tipo_2" className="text-gray-700">Diabetes Tipo 2</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="celiaquismo"
                        name="celiaquismo"
                        checked={formik.values.celiaquismo}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="celiaquismo" className="text-gray-700">Celiaquismo</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="anemia"
                        name="anemia"
                        checked={formik.values.anemia}
                        onChange={() =>formik.setFieldValue("anemia",!formik.values.anemia) }
                          className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="anemia" className="text-gray-700">Anemia</label>
                </div>
               
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="enfermedad_renal"
                        name="enfermedad_renal"
                        checked={formik.values.enfermedad_renal}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="enfermedad_renal" className="text-gray-700">Enfermedad renal</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="hipertension"
                        name="hipertension"
                        checked={formik.values.hipertension}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="hipertension" className="text-gray-700">Hipertensión</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="hipercolesterolemia"
                        name="hipercolesterolemia"
                        checked={formik.values.hipercolesterolemia}
                        onChange={formik.handleChange}
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="hipercolesterolemia" className="text-gray-700">Hipercolesterolemia</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="obesidad"
                        name="obesidad"
                        checked={formik.values.obesidad}
                        onChange={() =>formik.setFieldValue("obesidad",!formik.values.obesidad) }
                        className="mr-2 h-5 w-5 text-verde_oscuro focus:ring-verde_oscuro border-gray-300 rounded"
                    />
                    <label htmlFor="obesidad" className="text-gray-700">Obesidad</label>
                </div>

                <div>
                    <label htmlFor="alergias" className="text-gray-700">Alergias</label>
                    <input
                        type="text"
                        id="alergias"
                        name="alergias"
                        value={formik.values.alergias}
                        onChange={formik.handleChange}
                        className="rounded-md bg-gray-100 px-4 py-2 w-full border border-gray-300 focus:ring-verde_oscuro focus:border-verde_oscuro"
                    />
                </div>
                <Input type="hidden" label="" id="idConsultante" name="idConsultante" value={formik.values.idConsultante} />                     
           
                <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2 disabled:opacity-80 ">
                            {formik.isSubmitting ? 'Guardando sus modificaciones' : 'Guardar cambios'}
            </button>   
            </form>

        </>
    );





}

//export default FormularioAfecciones;
