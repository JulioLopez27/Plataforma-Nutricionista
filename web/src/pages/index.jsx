
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './Home'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'
import { Profile } from "./Profile"
//import { Consultante } from "./Consultante"
import { DetalleConsultante } from "./Consultante/detalle"
import { Receta} from './Receta'
import {Lista} from './Consultante/lista'
import {Historico} from './Receta/historico'
import {HistoricoRegistro} from './Registro/historico'

import { BotoneraConsultante } from "./Consultante/botonera" //TODO PRUEBAAA
import { EnviarRegistro } from "./Registro/enviarRegistro";
import { RegistroEnviado } from "./Registro/RegistroEnviado";
  

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }, 
  {
    path: "/profile",
    element: <Profile />,
  }, 
  /*{
    path: "/consultantes",
    element: <Consultante />,
  }, */
  {
    path: "/detalleConsultante",
    element: <DetalleConsultante/>,
  },
  {
    path: "/recetas",
    element: <Receta />,
  }, 
  {
    path: "/lista",
    element: <Lista />,
  }, 
  {
    path: "/historico",
    element: <Historico />,
  },
  {
    path: "/historicoRegistro",
    element: <HistoricoRegistro />,
  },
  {
    path: "/botonera",
    element: <BotoneraConsultante />,
  },
  {
    path: "/enviarRegistro",
    element: <EnviarRegistro />,
  },
  ,
  {
    path: "/registroEnviado",
    element: <RegistroEnviado />,
  },


]);

export const Router = () =>
  (<RouterProvider router={router} />)
