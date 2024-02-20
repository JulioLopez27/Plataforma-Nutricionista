import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from 'react-use'


export function Historico({}) {
  const [historyData, setHistoryData] = useState([]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idConsultante = urlParams.get('id');

  const [auth] = useLocalStorage('auth', {})


  const fetchHistory = async () => {
    try {

      const res = await axios({
        method: "post",
        baseURL: import.meta.env.VITE_API_URL,
        url: "/getHistory",
        data: { id: idConsultante },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accesToken}`
        }
      })


      return res.data;
    } catch (error) {
      alert('Error fetching history:' + error);
      return [];
    }
  };

  useEffect(() => {
    fetchHistory().then((data) => {
      setHistoryData(data);
    });
  }, []);

  //console.log(historyData)
  if (historyData.length === 0) {
    return (
      <div className="h-full w-full overflow-scroll">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-center flex-grow">Historico</h3>
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <tbody>
          <tr>
            <td className="p-4">Aun no le ha enviado sugerencias a este consultante..</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full overflow-scroll">
        <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-center flex-grow">Historico</h3>
        </div>
        <table className="w-full min-w-max table-auto text-left border border-black">
  <thead>
    <tr>
      <th className="border-b border-green-100 bg-green-50 p-4">Fecha de Creacion</th>
      <th className="border-b border-green-100 bg-green-50 p-4">Comentario</th>
      <th className="border-b border-green-100 bg-green-50 p-4">Enviado</th>
    </tr>
  </thead>
  <tbody>
    {historyData.map((historico) => (
      <tr key={historico.id} className="bg-white border border-black">
        <td className="p-4">{new Date(historico.fecha).toLocaleDateString()}</td>
        <td className="p-4">{historico.comentario}</td>
        <td className="p-4">{historico.enviado === 1 ? 'Enviado' : 'Sin Enviar'}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    );
            }}
  