import React from 'react';
import { Input } from '~/components'
import { useFormik } from 'formik'

export function FormularioAfecciones() {

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
    const userInfo = {
        diabetes_tipo_1: false,
        diabetes_tipo_2: false,
        celiaquismo: true,
        hipertension: false,
        alergias: 'mani, huevos, leche, soja',
        enfermedad_renal: false,
        hipercolesterolemia: false,
        anemia: false,
        obesidad: false
    }


    return (
        <form onSubmit={formik.handleSubmit} className="w-full max-w-lg space-y-4">
            <div>
                <label htmlFor="diabetes_tipo_1" className="block text-sm font-medium text-gray-700">
                    Diabetes Tipo 1
                </label>
                <input
                    type="checkbox"
                    id="diabetes_tipo_1"
                    name="diabetes_tipo_1"
                    checked={userInfo.diabetes_tipo_1}
                    onChange={handleInputChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>
            <div>
                <label htmlFor="diabetes_tipo_2" className="block text-sm font-medium text-gray-700">
                    Diabetes Tipo 2
                </label>
                <input
                    type="checkbox"
                    id="diabetes_tipo_2"
                    name="diabetes_tipo_2"
                    checked={userInfo.diabetes_tipo_2}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>
            <div>
                <label htmlFor="celiaquismo" className="block text-sm font-medium text-gray-700">
                    Celiaquismo
                </label>
                <input
                    type="checkbox"
                    id="celiaquismo"
                    name="celiaquismo"
                    checked={userInfo.celiaquismo}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>
            {/* Repite el patrón para los demás campos booleanos */}
            <Input label="Alergias" name="alergias" value={userInfo.alergias} onChange={formik.handleChange} className="rounded-md bg-gray-100 px-4 py-2" />
            <div>
                <label htmlFor="enfermedad_renal" className="block text-sm font-medium text-gray-700">
                    Enfermedad Renal
                </label>
                <input
                    type="checkbox"
                    id="enfermedad_renal"
                    name="enfermedad_renal"
                    checked={userInfo.enfermedad_renal}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>
            {/* Repite el patrón para los demás campos booleanos */}
            <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>
        </form>
    );
}

//export default FormularioAfecciones;
