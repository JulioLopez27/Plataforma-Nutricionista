import axios from 'axios';
import { Header, NavBar } from '~/components'
import { useLocalStorage } from 'react-use'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {useState,useEffect} from 'react'

export function ListadoConsultantes() {
  const [consultantsData, setConsultantsData] = useState([])
  const [auth] = useLocalStorage('auth', {})
  const navigate = useNavigate()

  if (!auth?.user?.id) {
    return <Navigate to="/" replace={true} />
  }

  const irAgregarConsultante = () => {
    navigate('/agregarConsultante')
  }

  const fetchConsultants = async () => {
    try {
      const response = await axios({
        method: "GET",
        baseURL: import.meta.env.VITE_API_URL,
        url: "/getConsultants",
        headers: { Authorization: `Bearer ${auth.accesToken}` }
      })
      //const response = await axios.get('http://localhost:3000/getConsultants');
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
  }, [])


  if (consultantsData.length === 0) {
    return (
      <>
        <Header nombreDelUsuario={auth.user.nombre} />
        <NavBar />

        {/* <div className="h-full w-full overflow-scroll"> */}
        <div className="mt-4 flex flex-wrap items-center justify-center h-full">

          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-4xl font-bold text-center mb-4">CONSULTANTES</h1>

            <button onClick={irAgregarConsultante} className="bg-verde_oscuro text-white font-bold py-2 px-4 rounded">
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

        <div className="mt-4 flex flex-wrap items-center justify-center h-full">

          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-4xl font-bold text-center mb-4">CONSULTANTES</h1>

            <button onClick={irAgregarConsultante} className="bg-verde_oscuro text-white font-bold py-2 px-4 rounded">
              Agregar Consultante
            </button>
          </div>
        </div>

        <div className="flex justify-around mt-5 mx-20 pb-4 border-b-2 border-verde_oscuro font-medium text-gris_texto text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ">
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
                    <a href={`${import.meta.env.VITE_WEB_URL}/detalleConsultante?id=${consultante.id}`} className="text-purple-500">

                      Ver detalle
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
