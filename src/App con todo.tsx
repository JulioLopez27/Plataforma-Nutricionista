import Menu from "./components/Menu";
import TRecetaCard from "./components/TRecetaCard";
import ClientesList from "./components/ClientesList";
import Receta from "./components/Receta";
import Historico from "./components/Historico";
import Perfil from "./components/Perfil";

<link rel="stylesheet" href="./index.css"></link>;

function App() {
  let historico = [
    { fecha: "01/01/2023", receta: "La mejorrrr" },
    {
      fecha: "01/08/2023",
      receta: "La peor",
    },
    {
      fecha: "01/09/2023",
      receta: "otra",
    },
  ];

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
  };

  let clientes = [
    { nombre: "Armando" },
    { nombre: "King Kong" },
    { nombre: "J.K. Rowling" },
  ];
  let perfil = {
    nombres: "Juanato",
    apellidos: "Hermida Orlando",
    descripcion: "Me especializo en hacerte gozar",
    especializacion: "Comida tantrica",
    correo: "arlondsa@dsadas.com",
    pais: "Un pais",
    fotoPrincipalURL: "dsda.com",
    fotosURL: ["sadsa"],
  };
  const handleSelectItems = (nombre: string) => alert(nombre);
  const handleSelectItemsH = (fecha: string) => alert(fecha);
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

      <div className=" block mx-28 w-10/12">
        <Receta
          nombre={receta.nombre}
          categorias={receta.categorias}
          dificultad={receta.dificultad}
          tiempo={receta.tiempo}
          ingredientes={receta.ingredientes}
          alergias={receta.alergias}
          vegano={receta.vegano}
          vegetariano={receta.vegetariano}
          celiaco={receta.celiaco}
          saludable={receta.saludable}
          pasos={receta.pasos}
          descripcion={receta.descripcion}
          imagenURL={receta.imagenURL}
        ></Receta>
      </div>

      <Historico
        onSelectItem={handleSelectItemsH}
        registros={historico}
      ></Historico>
      <Perfil
        nombres={perfil.nombres}
        apellidos={perfil.apellidos}
        descripcion={perfil.descripcion}
        especializacion={perfil.especializacion}
        correo={perfil.correo}
        pais={perfil.pais}
        fotoPrincipalURL={perfil.fotoPrincipalURL}
        fotosURL={perfil.fotosURL}
      ></Perfil>
    </>
  );
}

export default App;
