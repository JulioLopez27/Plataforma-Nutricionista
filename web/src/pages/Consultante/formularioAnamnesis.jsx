import React from 'react';
import { Input } from '~/components'
import { useFormik } from 'formik'



export function FormularioAnamnesis() {


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
        <form onSubmit={formik.handleSubmit} className="w-full max-w-lg space-y-4">
            <Input label="Fecha" type="date" name="fecha" value={userInfo.fecha} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Edad" type="number" name="edad" value={userInfo.edad} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Peso" type="number" step="0.01" name="peso" value={userInfo.peso} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Altura" type="number" step="0.01" name="altura" value={userInfo.altura} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Constitución Corporal" name="constitucion_corporal" value={userInfo.constitucion_corporal} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Historia Alimentaria" name="historia_alimentaria" value={userInfo.historia_alimentaria} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Horarios Alimenticios" name="horarios_alimenticios" value={userInfo.horarios_alimenticios} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Objetivos Clínicos" name="objetivos_clinicos" value={userInfo.objetivos_clinicos} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <Input label="Déficits Nutricionales" name="deficits_nutricionales" value={userInfo.deficits_nutricionales} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>
        </form>
    );
}

//export default FormularioAnamnesis;
