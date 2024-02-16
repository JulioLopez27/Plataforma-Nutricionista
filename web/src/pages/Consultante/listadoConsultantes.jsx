import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, NavBar } from '~/components'
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

export function ListadoConsultantes({ }) {
  const [consultantsData, setConsultantsData] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth', {})

  if (!auth?.user?.id) {
    return <Navigate to="/" replace={true} />
  }

  const fetchConsultants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getConsultants');
      //      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching consultants:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchConsultants().then((data) => {
      setConsultantsData(data);
    });
  }, []);


  if (consultantsData.length === 0) {
    return (
      <>
        <Header nombreDelUsuario={auth.user.nombre} />
        <NavBar />
      <div></div>
        {/* <div className="h-full w-full overflow-scroll"> */}
        <div className="mt-4 flex flex-wrap items-center justify-center h-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-center flex-grow">CONSULTANTES</h1>
            <button className="bg-verde_oscuro text-white font-bold py-2 px-4 rounded">
              Agregar Consultante
            </button>
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <tr>
              <td className="p-4">Usted no tiene consultantes.</td>
            </tr>
          </table>
        </div>

      </>
    );
  } else {
    return (
      <>
        <Header nombreDelUsuario={auth.user.nombre} />
        <NavBar />

        <div className="h-full w-full overflow-scroll">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-center flex-grow">CONSULTANTES</h1>
            <button className="bg-verde_oscuro text-white font-bold py-2 px-4 rounded">
              Agregar Consultante
            </button>
          </div>
          <table className="w-full min-w-max table-auto text-left border border-black">
            <thead>
              <tr>
                <th className="border-b border-green-100 bg-green-50 p-4">Nombre</th>
                <th className="border-b border-green-100 bg-green-50 p-4">Correo</th>
                <th className="border-b border-green-100 bg-green-50 p-4">Ver ficha</th>
              </tr>
            </thead>
            <tbody>
              {consultantsData.map((consultante) => (
                <tr key={consultante.id} className="bg-white border border-black">
                  <td className="p-4">{consultante.nombre} {consultante.apellido}</td>
                  <td className="p-4">{consultante.email}</td>
                  <td className="p-4">
                    <a href={`http://127.0.0.1/Consultante/ficha${consultante.id}`} className="text-purple-500">
                      Ir a Ficha
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </>
    );
  }
}
