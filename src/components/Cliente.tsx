import { MouseEvent, useState } from "react";

interface Props {
  nombre: string;
  apellido: string;
  amnesis: string[];
  alergias: string[];
  comentarios: string;
}

function Cliente({ nombre, apellido, amnesis, alergias, comentarios }: Props) {
  return (
    //Los <> Implican fragmento abreviado
    // Los : en los brackets implican ELSE
    <>
      <div className=" w-full rounded-lg bg-green-100">
        <h2>
          {nombre} {apellido}
        </h2>
        <hr></hr>
        <p>
          <strong>Amnesis: </strong>
        </p>
        {amnesis.length === 0 ? <p>No Hay</p> : null}
        <ul className="list-group">
          {amnesis.map((a) => (
            <li>{a}</li>
          ))}
        </ul>

        <p>
          <strong>Alergias: </strong>
        </p>
        {alergias.length === 0 ? <p>No Tiene</p> : null}
        <ul className="list-group">
          {alergias.map((a) => (
            <li>{a}</li>
          ))}
        </ul>
        <p>
          <strong>Comentarios: </strong>
        </p>
        <p>{comentarios}</p>
        <div className=" flex flex-col items-center  w-full">
          <button className=" bg-green-800 text-white p-2">
            Enviar Receta
          </button>
        </div>
      </div>
    </>
  );
}

export default Cliente;
