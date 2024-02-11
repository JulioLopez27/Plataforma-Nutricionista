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
    const consultanteInfo = {
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
                <Input
                    htmlFor="diabetes_tipo_1"
                    label="Diabetes Tipo 1"
                    type="checkbox"
                    id="diabetes_tipo_1"
                    name="diabetes_tipo_1"
                    checked={consultanteInfo.diabetes_tipo_1}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>
            <div>
                <Input
                    htmlFor="diabetes_tipo_2"
                    label="Diabetes Tipo 2"
                    type="checkbox"
                    id="diabetes_tipo_2"
                    name="diabetes_tipo_2"
                    checked={consultanteInfo.diabetes_tipo_2}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>

            <div>
                <Input
                    htmlFor="celiaquismo"
                    label="Celiaquismo"
                    type="checkbox"
                    id="celiaquismo"
                    name="celiaquismo"
                    checked={consultanteInfo.celiaquismo}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>

            <div>
            <Input 
                label="Alergias" 
                name="alergias" 
                value={consultanteInfo.alergias} 
                onChange={formik.handleChange} 
                className="rounded-md bg-gray-100 px-4 py-2" 
            />
            </div>
            <div>
                <Input
                    htmlFor="enfermedad_renal"
                    label="Enfermedad renal"
                    type="checkbox"
                    id="enfermedad_renal"
                    name="enfermedad_renal"
                    checked={consultanteInfo.enfermedad_renal}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>

            <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>
        </form>
    );
}

//export default FormularioAfecciones;
