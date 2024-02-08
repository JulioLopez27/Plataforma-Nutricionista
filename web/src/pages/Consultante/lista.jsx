import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Lista({}) {
  const [consultantsData, setConsultantsData] = useState([]);

  const fetchConsultants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getConsultants');
      console.log(response)
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
    return( 
      <div className="h-full w-full overflow-scroll">
      <div className="flex items-center justify-between mb-4">
      <h1 className="text-4xl font-bold text-center flex-grow">CONSULTANTES</h1>
   <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded">
     Agregar Consultante
   </button>
 </div>      
 <table className="w-full min-w-max table-auto text-left">
<tr>
  Usted no tiene consultantes.
  </tr> </table>
</div>
)
  }else{
  return (
    <div className="h-full w-full overflow-scroll">
           <div className="flex items-center justify-between mb-4">
           <h1 className="text-4xl font-bold text-center flex-grow">CONSULTANTES</h1>
        <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded">
          Agregar Consultante
        </button>
      </div>      
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-green-100 bg-green-50 p-4">Nombre</th>
            <th className="border-b border-green-100 bg-green-50 p-4">Correo</th>
            <th className="border-b border-green-100 bg-green-50 p-4">Ver ficha</th>
          </tr>
        </thead>
        <tbody>
          {consultantsData.map((consultante) => (
            <tr key={consultante.id} className="even:bg-green-50/50">
              <td className="p-4">{consultante.nombre} {consultante.apellido}</td>
              <td className="p-4">{consultante.email}</td>
              <td className="p-4">
                <a href={`http://127.0.0.1/Consultante/ficha${consultante.id}`}>Ir a Ficha</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
}