import { MouseEvent, useState } from "react";

interface Props {
  nombre: string;
  categorias: string[];
  dificultad: string;
  tiempo: number;
  ingredientes: string[];
  alergias: string[];
  vegano: boolean;
  vegetariano: boolean;
  celiaco: boolean;
  saludable: boolean;
  pasos: string;
  descripcion: string;
  imagenURL: string;
}

function Receta({
  nombre,
  categorias,
  dificultad,
  tiempo,
  ingredientes,
  alergias,
  vegano,
  vegetariano,
  celiaco,
  saludable,
  pasos,
  descripcion,
  imagenURL,
}: Props) {
  return (
    //Los <> Implican fragmento abreviado
    // Los : en los brackets implican ELSE
    <>
      <div className=" w-full rounded-lg bg-green-100">
        <img className=" w-full h-72" src={imagenURL}></img>
        <h2>{nombre}</h2>
        <hr></hr>
        <table className=" justify-center">
          <tr className=" w-full">
            <th className=" px-4">Vegano</th>
            <th className=" px-4">Vegetariano</th>
            <th className=" px-4">Celiaco</th>
            <th className=" px-4">Saludable</th>
          </tr>
          <tr>
            <td className=" px-4">{vegano ? "Si" : "No"}</td>
            <td className=" px-4">{vegetariano ? "Si" : "No"}</td>
            <td className=" px-4">{celiaco ? "Si" : "No"}</td>
            <td className=" px-4">{saludable ? "Si" : "No"}</td>
          </tr>
        </table>
        <p>
          <strong>Categorias: </strong>
          {categorias}
        </p>
        <p>
          <strong>Dificultad: </strong>
          {dificultad}
        </p>
        <p>
          <strong>Tiempo: </strong>
          {tiempo}
        </p>
        <p>
          <strong>Ingredientes: </strong>
          {ingredientes}
        </p>
        <p>
          <strong>Alergias: </strong>
          {alergias}
        </p>
        <h3>Descripcion</h3>
        <p>{descripcion}</p>
        <h3>Pasos</h3>
        <p>{pasos}</p>
        <div className=" flex flex-col items-center  w-full">
          <button className=" bg-green-800 text-white p-2">
            Compartir Receta
          </button>
        </div>
      </div>
    </>
  );
}

export default Receta;
