
import axios from 'axios'
import * as yup from 'yup'
import { useFormik } from 'formik'

import { Input, CustomModal } from '~/components'
import { useState } from 'react';


const validationSchema = yup.object().shape({
  email: yup.string().required('Campo obligatorio').email('Ingrese un formato valido').trim(),
  password: yup.string().required('Campo obigatorio').trim()
})

export function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false); // Agrega este estado
  const [errorMessage, setErrorMessage] = useState(''); // Agrega este estado para manejar el mensaje de error

  const formik = useFormik({
    onSubmit: async (values) => {

      try {
        const res = await axios({
          method: 'post',
          baseURL: 'http://localhost:3000',
          url: '/login',
          data: values
        })

        console.log("🚀 ~ file: index.jsx:20 ~ onSubmit: ~ res:", res.data)
      } catch (error) {
         console.log('Error del servidor', error);
        setIsModalOpen(true); // Abre el modal cuando hay un error
        setErrorMessage(error.message); // Guarda el mensaje de error
      }
    },
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema
  })


  const handleCloseModal = () => {
    setIsModalOpen(false); // Función para cerrar el modal
  };

  return (

    <div className="container max-w-2xl bg-white rounded-2xl border-2 p-8 my-24 mx-auto space-x-4 ">

      <main className="p-4">

        <h1 className="text-3xl text-center font-semibold mb-3">Bienvenido nutricionista</h1>

        <p className="font-semibold">Este es un espacio dedicado a profesionales de la nutrición para gestionar y mejorar la salud de sus pacientes.</p>

        <form className="space-y-4 mt-3" onSubmit={formik.handleSubmit}>

          <Input
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
            type="password"
            name="password"
            label="Constraseña"
            placeholder="Ingrese su contraseña"
            error={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="flex justify-center space-x-4 mt-4">

            <button type='submit' className="text-center p-3 bg-smoke rounded-xl border-2 border-magenta ">Ingresar al Sistema</button>
            <a href="/signup" className="text-center p-3 bg-magenta rounded-xl border-2 border-solid text-gris">Registrarse</a>
          </div>

        </form>
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-2xl">Algo salió mal</h2>
          <p>{errorMessage}</p> {/* Muestra el mensaje de error en el modal */}
        </CustomModal>
      </main>

    </div >
  )
}