import axios from "axios"
import { Input, Header, NavBar } from "~/components"
import React from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export function RegistroEnviado() {

  useEffect(() => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idBorrador = urlParams.get('tipo');

    if (idBorrador != "") {
      const fetchData = async () => {
        try {

          //const response = await axios.get(`http://localhost:3000/getReport?id=${idBorrador}`);
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/getReport?id=${idBorrador}`);

          if (response.data.tipo != "") {
            document.getElementById("tipo").innerHTML = response.data.tipo;
            document.getElementById("cuerpo").innerHTML = response.data.nota;
          } else {
            document.getElementById("tipo").innerHTML = "ID de informe incorrecto";
            document.getElementById("cuerpo").innerHTML = "ID de informe incorrecto";
          }

        } catch (error) {
          console.error('Error trayendo data:', error);
          document.getElementById("tipo").innerHTML = "ID de informe incorrecto";
          document.getElementById("cuerpo").innerHTML = "ID de informe incorrecto";
        }
      };

      fetchData();
    }
  }, []);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back in the history stack
  };

  return (

    <div>
      <Header />
      <NavBar />
      <main className="mt-4 h-44">
        <section id="enviarRegistro" className="container justify-center" >
          <div class="flex justify-center items-center h-44">
            <div class=" w-9/12 h-44">
              <div class="h-44" encType="multipart/form-data">
                <div class=" h-44">
                  <div class="border-solid border-2 border-black " label="Titulo" name="tipo" type="text" id="tipo"
                  />
                  <br></br>
                  <div class="border-solid border-2 border-black "
                    id="cuerpo"
                    name="cuerpo"
                  />
                  <br></br>
                  <p> <button onClick={handleGoBack} class=" bg-purple-400 p-2">Volver Atras</button></p>

                </div>

              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
