
import { useState } from 'react';
import { Header, NavBar } from '~/components'
import { Input, Custom_select, CustomModal } from '~/components'
import { useFormik } from "formik"
import { useLocalStorage } from 'react-use'
import * as yup from "yup"

export function AgregarConsultante() {


    const validationSchema = yup.object().shape({
        nombre: yup.string().required('El nombre es obligatorio'),
        apellido: yup.string().required('El apellido es obligatorio'),
        fecha_nac: yup.date().required('La fecha de nacimiento es obligatoria').nullable(), //Si falla probar con quitar ".nulleable()"
        telefono: yup.string()
        .min(9, 'El número de teléfono debe tener al menos 9 dígitos')
        .max(15, 'El número de teléfono tiene un máximo de 15 dígitos')
        .matches(/^[0-9]*$/, 'El número de teléfono solo puede contener números'),
        correo: yup.string().email().required('Campo obligatorio'),

    })

    const [isModalOpen, setIsModalOpen] = useState(false) // Agrega este estado
    const [message, setMessage] = useState('') // Agrega este estado para manejar el mensaje de error  
    const [messageType, setMessageType] = useState('')

    const [auth, setAuth] = useLocalStorage('auth', {})

    const formik = useFormik({
        onSubmit: async (values) => {

            try {

                const res = await axios({
                    method: "POST",
                    baseURL: "http://localhost:3000",
                    url: '/createNewConsultant',
                    data: values,
                    headers: { Authorization: `Bearer ${auth.accesToken}` }
                })
                //alert("Consultante creado correctamente!")

                setIsModalOpen(true);
                setMessage("Consultante creado correctamente!")
                setMessageType('approval');

                location.reload();

            } catch (error) {
                //alert("Error al crear consultante: " + error)

                setIsModalOpen(true);
                setMessage("Error al crear consultante: " + error.response.data.error);
                setMessageType('error');
            }


        },
        initialValues: {
            nombre: "",
            apellido: "",
            fecha_nac: "",
            correo: "",
            sexo: ""
        },
        validationSchema
    })


    const handleCloseModal = () => {
        setIsModalOpen(false); // Función para cerrar el modal
    }
    return (

        <div>
            <Header nombreDelUsuario={auth.user.nombre} />
            <NavBar />
            <div className="flex flex-col lg:flex-row justify-center items-center h-full">



                <form className="w-full max-w-lg space-y-4" onSubmit={formik.handleSubmit}>

                    <Input label="Nombre" name="nombre" value={formik.values.nombre} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2"  error={formik.touched.nombre && formik.errors.nombre} />
                    <Input label="Apellido" name="apellido" value={formik.values.apellido} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2"  error={formik.touched.apellido && formik.errors.apellido}/>
                    <Input type="date" label="Fecha nacimiento" name="fecha_nac" value={formik.values.fecha_nac} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2"  error={formik.touched.fecha_nac && formik.errors.fecha_nac}/>
                    <Input label="Correo" name="correo" value={formik.values.correo} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2"  error={formik.touched.correo && formik.errors.correo}/>
                    <Input label="Teléfono" name="telefono" value={formik.values.telefono} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2"  error={formik.touched.telefono && formik.errors.telefono}/>
                    {/* <Input label="Sexo" name="sexo" value="Masculino" onChange={handleInputChange} className="rounded-md bg-gray-100 px-4 py-2" /> */}
                    <select
                        label="Sexo"
                        name="sexo"
                        value={formik.values.sexo}
                        onChange={formik.handleChange}
                        className="rounded-md bg-gray-100 px-4 py-2"
                        error={formik.touched.sexo && formik.errors.sexo}
                    >
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                    <div>
                        <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>
                    </div>
                </form>
            </div>

            <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} message={message} messageType={messageType}>
                <h2 className="text-2xl">{messageType === 'error' ? 'Algo salió mal' : 'Éxito'}</h2>
                {messageType === 'error' && <p>{message}</p>}
            </CustomModal>
        </div>
    );
}