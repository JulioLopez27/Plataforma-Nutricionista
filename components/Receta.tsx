import { MouseEvent, useState } from "react";

interface Props {
  receta: {
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
  };
}

function Receta({ receta }: Props) {
  return (
    //Los <> Implican fragmento abreviado
    // Los : en los brackets implican ELSE
    <>
      <div className=" w-full rounded-lg">
        <img className=" w-full h-72" src={receta.imagenURL}></img>
        <h2>{receta.nombre}</h2>
        <hr></hr>
        <table>
          <th>Vegano</th>
          <th>Vegetariano</th>
          <th>Celiaco</th>
          <th>Saludable</th>
          <tr>{receta.vegano}</tr>
          <tr>{receta.vegetariano}</tr>
          <tr>{receta.celiaco}</tr>
          <tr>{receta.saludable}</tr>
        </table>
        <p>
          <strong>Categorias: </strong>
          {receta.categorias}
        </p>
        <p>
          <strong>Dificultad: </strong>
          {receta.dificultad}
        </p>
        <p>
          <strong>Tiempo: </strong>
          {receta.tiempo}
        </p>
        <p>
          <strong>Ingredientes: </strong>
          {receta.ingredientes}
        </p>
        <p>
          <strong>Alergias: </strong>
          {receta.alergias}
        </p>
        <h3>Descripcion</h3>
        <p>{receta.descripcion}</p>
        <h3>Pasos</h3>
        <p>{receta.pasos}</p>
      </div>
    </>
  );
}

export default Receta;
