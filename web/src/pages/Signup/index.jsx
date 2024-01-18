
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'


import { Input, Custom_select } from '~/components'


//Codigo validacion de extencion de archivo
const validateFileType = (value) => {
    if (!value) return false;

    const fileName = value.name;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    return allowedExtensions.test(fileName);
}

const validationSchema = yup.object().shape({
    nombre: yup.string().required('Campo obligatorio'),
    apellido: yup.string().required('Campo obligatorio'),
    telefono: yup.number().integer().typeError("Ingrese datos numéricos"),
    email: yup.string().email().required('Campo obligatorio'),
    password: yup.string().required('Campo obligatorio'),
    especialidad: yup.number().integer().required('Campo obligatorio'),
    anos_experiencia: yup.number().required('Campo obligatorio'),
    pais: yup.number().integer().required('Campo obligatorio'),
    ciudad: yup.string().required('Campo obligatorio'),
    foto_diploma: yup.mixed().test(
        'fileType',
        'Solo se permiten archivos de imagen (jpg, jpeg, png, gif)',
        validateFileType
    )
})

export const Signup = () => {


    const fetchSpecialty = async () => {
        return axios({
            method: 'GET',
            baseURL: 'http://localhost:3000',
            url: '/getSpecialty',
        });
    }

    const fetchCountries = async () => {
        return axios({
            method: 'GET',
            baseURL: 'http://localhost:3000',
            url: '/getCountries'

        })
    }

    const formik = useFormik({
        onSubmit: async (values) => {
            let formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });
            
            try {

                const res = await axios({
                    method: 'POST',
                    baseURL: "http://localhost:3000",
                    url: '/signup',
                    data: formData,
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })

            } catch (err) {
                console.log("🚀 ~ onSubmit: ~ err:", err.message)

            }

        },
        initialValues: {
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            password: '',
            especialidad: '',
            anos_experiencia: '',
            foto_diploma: '',
            pais: '',
            ciudad: '',

        },
        validationSchema
    })

    return (
        <div className="container max-w-2xl bg-white rounded-2xl border-2 p-8 my-24 mx-auto space-x-4 ">
            <main className="p-4">

                <h2 className="text-3xl text-center font-semibold mb-3">Bienvenido a la página de registro</h2>

                <form className="space-y-4 mt-3" onSubmit={formik.handleSubmit} >

                    <Input
                        htmlFor='nombre'
                        id='nombre'
                        autoComplete="off"
                        type="text"
                        name="nombre"
                        label="Nombre"
                        placeholder="ingrese su nombre"
                        error={formik.touched.nombre && formik.errors.nombre}
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='apellido'
                        id='apellido'
                        autoComplete="off"
                        type="text"
                        name="apellido"
                        label="Apellido "
                        placeholder="ingrese su apellido"
                        error={formik.touched.apellido && formik.errors.apellido}
                        value={formik.values.apellido}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='telefono'
                        id='telefono'
                        autoComplete="off"
                        type="text"
                        name="telefono"
                        label="Telefono"
                        placeholder="ingrese su numero telefonico (campo no obligatorio)"
                        error={formik.touched.telefono && formik.errors.telefono}
                        value={formik.values.telefono}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='email'
                        id='email'
                        autoComplete="off"
                        type="text"
                        name="email"
                        label="Correo electrónico "
                        placeholder="ingrese su correo"
                        error={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='password'
                        id='password'
                        type="password"
                        name="password"
                        label="Constraseña"
                        placeholder="Ingrese su contraseña"
                        error={formik.touched.password && formik.errors.password}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Custom_select
                        htmlFor='especialidad'
                        id='especialidad'
                        type="number"
                        name="especialidad"
                        label="Especialidad"
                        placeholder="Ingrese su especialidad"
                        error={formik.touched.especialidad && formik.errors.especialidad}
                        value={formik.values.especialidad}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        dataFetcher={fetchSpecialty}
                    />

                    <Input
                        htmlFor='anos_experiencia'
                        id='anos_experiencia'
                        type="number"
                        name="anos_experiencia"
                        label="Experiencia"
                        placeholder="Ingrese su tiempo de experiencia en años"
                        error={formik.touched.anos_experiencia && formik.errors.anos_experiencia}
                        value={formik.values.anos_experiencia}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Custom_select
                        htmlFor='pais'
                        id='pais'
                        type="number"
                        name="pais"
                        label="País"
                        placeholder="Ingrese su país"
                        error={formik.touched.pais && formik.errors.pais}
                        value={formik.values.pais}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        dataFetcher={fetchCountries}
                    />

                    <Input
                        htmlFor='ciudad'
                        id='ciudad'
                        type="text"
                        name="ciudad"
                        label="Ciudad"
                        placeholder="Ingrese su ciudad de residencia"
                        error={formik.touched.ciudad && formik.errors.ciudad}
                        value={formik.values.ciudad}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <Input
                        htmlFor='foto_diploma'
                        id="foto_diploma"
                        type="file"
                        name="foto_diploma"
                        label='Foto de su diploma'
                        accept='image/*'
                        error={formik.touched.foto_diploma && formik.errors.foto_diploma}
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                            formik.setFieldValue("foto_diploma", event.currentTarget.files[0]);
                        }}
                    />

                    <div className="flex justify-center space-x-4 mt-4">
                        <a href="/" className="text-center p-3 bg-magenta rounded-xl border-2 border-solid text-gris">Página principal</a>

                        <button type="submit" className="text-center p-3 bg-magenta rounded-xl border-2 border-solid text-gris disabled:opacity-80"
                            disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? 'Creando su usuario' : 'Crear mi cuenta'}

                        </button>

                    </div>

                </form>

            </main>

        </div >
    )
}