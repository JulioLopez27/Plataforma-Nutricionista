import React, { useState } from 'react';
import { Input } from '~/components';
import { useFormik } from 'formik'

export function FormularioTipoDieta({ onSubmit }) {
    const [formData, setFormData] = useState({
        vegetariano: false,
        vegano: false,
        pescetariano: false,
        crudivegano: false,
        sin_gluten: true,
        sin_lactosa: false,
        keto: false
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

    // const handleChange = (e) => {
    //     const { name, checked } = e.target;
    //     setFormData({ ...formData, [name]: checked });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit(formData);
    // };

    return (
        <form form onSubmit={formik.handleSubmit} className="w-full max-w-lg space-y-4">

            <div>
                <Input
                    htmlFor="vegetariano"
                    label="Vegetariano"
                    type="checkbox"
                    id="vegetariano"
                    name="vegetariano"
                    checked={formData.vegetariano}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>


            <div>
                <Input
                    htmlFor="vegano"
                    label="Vegano"
                    type="checkbox"
                    id="vegano"
                    name="vegano"
                    checked={formData.vegano}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>



            <div>
                <Input
                    htmlFor="pescetariano"
                    label="Pescetariano"
                    type="checkbox"
                    id="pescetariano"
                    name="pescetariano"
                    checked={formData.pescetariano}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>



            <div>
                <Input
                    htmlFor="crudivegano"
                    label="Crudivegano"
                    type="checkbox"
                    id="crudivegano"
                    name="crudivegano"
                    checked={formData.crudivegano}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>




            <div>
                <Input
                    htmlFor="sin_gluten"
                    label="Sin gluten"
                    type="checkbox"
                    id="sin_gluten"
                    name="sin_gluten"
                    checked={formData.sin_gluten}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>



            <div>
                <Input
                    htmlFor="sin_lactosa"
                    label="Sin lactosa"
                    type="checkbox"
                    id="sin_lactosa"
                    name="sin_lactosa"
                    checked={formData.sin_lactosa}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>



            <div>
                <Input
                    htmlFor="keto"
                    label="Keto"
                    type="checkbox"
                    id="keto"
                    name="keto"
                    checked={formData.keto}
                    onChange={formik.handleChange}
                    className="rounded-md bg-gray-100 px-4 py-2"
                />
            </div>



            <button 
                type="submit" 
                className='bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2'
                >
                Guardar
            </button>
        </form>
    );
}

//export default FormularioTipoDieta;
