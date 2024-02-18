import React from 'react';
import { Input } from '~/components'
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useLocalStorage } from 'react-use'
import { useFormik } from 'formik'

export function FormularioGeneral() {

    const [auth, setAuth] = useLocalStorage('auth', {})
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idConsultante = urlParams.get('id');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        try {
            const response = await axios({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/detalleConsultante',
                data: idConsultante,
                headers: { Authorization: `Bearer ${auth.accesToken}` }
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    // const formik = useFormik({
    //     onSubmit: async (values) => {
    //         try {
    //             const res = await axios({
    //                 method: 'get',
    //                 baseURL: import.meta.env.VITE_API_URL,
    //                 url: '/getConsultantDataForId',
    //                 data: values
    //             })

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    // })


    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    console.log(consultante);

    return (
        <>
            {data.map((consultante, index) => (
                <form key={index} className="w-full max-w-lg space-y-4">
                    <Input label="Nombre" name="nombre" value={consultante.nombre} onChange={(e) => handleInputChange(e, index)} className="rounded-md bg-gray-100 px-4 py-2" />
                    <Input label="Apellido" name="apellido" value={consultante.apellido} onChange={(e) => handleInputChange(e, index)} className="rounded-md bg-gray-100 px-4 py-2" />
                    <Input label="Teléfono" name="telefono" value={consultante.telefono} onChange={(e) => handleInputChange(e, index)} className="rounded-md bg-gray-100 px-4 py-2" />
                    <Input label="Sexo" name="sexo" value={consultante.sexo} onChange={(e) => handleInputChange(e, index)} className="rounded-md bg-gray-100 px-4 py-2" />
                    <button type="submit" className="bg-verde_oscuro hover:bg-verde_claro text-white font-bold py-2 px-4 rounded mt-2">Guardar cambios</button>
                </form>
            ))}
        </>
    );
}