import React, { useState }from 'react';
import { Input } from '~/components'
import { useFormik } from 'formik'
import { useLocalStorage } from 'react-use'
import { Navigate, useNavigate } from 'react-router-dom'



export function FormularioRegistros( ) {
    const [auth, setAuth] = useLocalStorage('auth', {})
    setAuth(res.data)

    const [consultanteInfo, setFormData] = useState({
        enviado: false,

    });

    const formik = useFormik({
        onSubmit: async (values) => {

            // try {
            //     const res = await axios({
            //         //   method: 'post',
            //         //   baseURL: 'http://localhost:3000',
            //         //   url: '/login',
            //         //   data: values
            //     })

            // } catch (error) {

            // }
        }

    })


    return (
        <form  className="w-full max-w-lg space-y-4">
            <Input label="Título" name="titulo" value="" onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Contenido" name="contenido" value="" onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2 " />
            <div>
                <Input
                    htmlFor="enviado"
                    label="Enviado"
                    type="checkbox"
                    id="enviado"
                    name="enviado"
                    checked={consultanteInfo.enviado}
                    onChange={formik.handleChange}
                    disabled  
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>
            <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Generar nuevo registro</button>




        </form>
    );
}