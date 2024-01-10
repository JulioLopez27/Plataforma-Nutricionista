import { MouseEvent, useState } from "react";

interface Props {
  nombres: string;
  apellidos: string;
  descripcion: string;
  especializacion: string;
  correo: string;
  pais: string;
  fotoPrincipalURL: string;
  fotosURL: string[];
}

//Este componente deberia usarse para cambiar los valores, por si el nutricionista quiere cambiar sus datos, asi que deberia poder comunicarse
//con la base de datos bidireccionalmente: 1) cuando carga los datos a mostras 2) si el nutricionista cambia sus datos

//Yo diria de limitar fotos extras a 3 o 4, y que aparezcan como en una especie de lista, y ahi las pdoes sacar o reorganizar en orden

function Perfil({
  nombres,
  apellidos,
  descripcion,
  especializacion,
  correo,
  pais,
  fotoPrincipalURL,
  fotosURL,
}: Props) {
  return (
    //Los <> Implican fragmento abreviado
    // Los : en los brackets implican ELSE
    <>
      <div className=" w-full rounded-lg bg-green-100">
        <h2>
          <input type="text" id="inputNom" placeholder={nombres}></input>
          <input id="inputApe" type="text" placeholder={apellidos}></input>
        </h2>
        <hr></hr>
        <p>
          <strong>Correo: </strong>
        </p>
        <p>
          <input id="inputCorreo" type="text" placeholder={correo}></input>
        </p>
        <p>
          <strong>Pais: </strong>
        </p>
        <p>
          <input id="inputPais" type="text" placeholder={pais}></input>
        </p>

        <p>
          <strong>Mensaje de Introduccion: </strong>
        </p>
        <p>
          <input id="inputDesc" type="text" placeholder={descripcion}></input>
        </p>
        <p>
          <strong>Especializacion: </strong>
        </p>
        <p>
          <input
            id="inputEsp"
            type="text"
            placeholder={especializacion}
          ></input>
        </p>
        <p>
          <strong>Foto Principal: </strong>
        </p>
        <p>
          <input
            id="inputFoto"
            type="text"
            placeholder={fotoPrincipalURL}
          ></input>
        </p>
        <p>
          <strong>Subir mas fotos: </strong>
        </p>

        <p>
          <input id="inputFotos" type="text" placeholder={fotosURL[0]}></input>
        </p>
        <div className=" flex flex-col items-center  w-full">
          <button className=" bg-green-800 text-white p-2">
            Enviar Cambios
          </button>
        </div>
      </div>
    </>
  );
}

export default Perfil;
