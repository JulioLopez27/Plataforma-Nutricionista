import Menu from "./components/Menu";
import TRecetaCard from "./components/TRecetaCard";
import ClientesList from "./components/ClientesList";
import Receta from "./components/Receta";

<link rel="stylesheet" href="./index.css"></link>;

function App() {
  let recetas = [
    {
      nombre: "Julio a las Brazas",
      imagenURL: "UFA",
      dificultad: "Alguna",
      tiempo: 12,
      categorias: "Pollos",
    },
    {
      nombre: "Gabriel al Spiedo",
      imagenURL: "UFA",
      dificultad: "Imposible",
      tiempo: 13,
      categorias: "Pollos",
    },
    {
      nombre: "Eggnaciomelette",
      imagenURL: "UFA",
      dificultad: "Suficiente",
      tiempo: 14,
      categorias: "Omelettes,Humanidad",
    },
    {
      nombre: "Otra Receta",
      imagenURL: "UFA",
      dificultad: "Poca",
      tiempo: 15,
      categorias: "Incomestibles",
    },
    {
      nombre: "Ultima",
      imagenURL: "UFA",
      dificultad: "No se sabe",
      tiempo: 16,
      categorias: "Masticables",
    },
  ];

  let receta = {
    receta: {
      nombre: "Mejor Receta",
      categorias: ["locura", "venenosa"],
      dificultad: "Hardcore",
      tiempo: 45,
      ingredientes: ["Azucar", "Flores", "Muchos Colores", "Quimico X"],
      alergias: ["gatos", "perros"],
      vegano: true,
      vegetariano: true,
      celiaco: false,
      saludable: false,
      pasos: "Primer paso: Cortar un pavo. Segundo paso: Hornearlo",
      descripcion: "alto  guiso",
      imagenURL: "Foto",
    },
  };

  let clientes = [
    { nombre: "Armando" },
    { nombre: "King Kong" },
    { nombre: "J.K. Rowling" },
  ];
  return (
    <>
      <Menu />

      <div className=" block mx-28 w-full">
        <Receta receta={receta}></Receta>
      </div>
    </>
  );
}

export default App;
