import Menu from "./components/Menu";
import TRecetaCard from "./components/TRecetaCard";
import ClientesList from "./components/ClientesList";

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

  let clientes = [
    { nombre: "Armando" },
    { nombre: "King Kong" },
    { nombre: "J.K. Rowling" },
  ];
  const handleSelectItems = (nombre: string) => alert(nombre);
  return (
    <>
      <Menu />

      <div className=" mx-28 w-full">
        <TRecetaCard recetas={recetas}></TRecetaCard>
      </div>

      <div className=" block mx-28 w-full">
        <ClientesList
          onSelectItem={handleSelectItems}
          clientes={clientes}
        ></ClientesList>
      </div>
    </>
  );
}

export default App;
