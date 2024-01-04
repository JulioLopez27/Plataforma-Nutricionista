import Logo from "../assets/LogoC.png";
<link rel="stylesheet" href="./index.css"></link>;
//import "./Menu.css";

const Menu = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap border-b-2 h-14 border-black">
      <div className=" flex-grow flex items-center w-auto overflow-hidden">
        <div className="inline-block items-center flex-shrink-0 mr-6">
          <img
            className="object-scale-down fill-current h-12 w-18 mr-2"
            src={Logo}
            height=""
          />
        </div>

        <div className="text-sm flex-grow">
          <a
            href="#"
            className=" pr-20 border-r-4 border-black  inline-block mt-0 text-purple-900 hover:text-green-900 mr-4"
          >
            Inicio
          </a>
        </div>
        <div className="text-sm flex-grow">
          <a
            href="#"
            className=" pr-20 border-r-4 border-black  inline-block mt-0 text-purple-900 hover:text-green-900 mr-4"
          >
            Clientes
          </a>
        </div>
        <div className="text-sm flex-grow">
          <a
            href="#"
            className=" pr-20 border-r-4 border-black  inline-block mt-0 text-purple-900 hover:text-green-900 mr-4"
          >
            Recetas
          </a>
        </div>
        <div className="text-sm flex-grow">
          <a
            href="#"
            className=" pr-20 border-r-4 border-black  inline-block mt-0 text-purple-900 hover:text-green-900 mr-4"
          >
            Mi Perfil
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
