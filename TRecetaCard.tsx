import React, { useState } from "react";

interface TRecetaCardProps {
  recetas: {
    nombre: string;
    imagenURL: string;
    dificultad: string;
    tiempo: number;
    categorias: string;
  }[];
}

export default function TRecetaCard({ recetas }: TRecetaCardProps) {
  return (
    <>
      {recetas.map((receta) => (
        <div className="content-center rounded-md w-3/12 mt-2 h-1/5 float-left bg-red-100 overflow-auto hover:bg-green-300">
          <div className="justify w-full">
            <img className=" w-3/4" src={receta.imagenURL}></img>
          </div>
          <h2 className=" text-purple-800 text-center"> {receta.nombre}</h2>

          <div className="">
            <p>
              <strong>Dificultad:</strong> {receta.dificultad}
            </p>
            <p>
              <strong>Tiempo:</strong> {receta.tiempo}
            </p>
            <p>
              <strong>Categorias:</strong> {receta.categorias}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
