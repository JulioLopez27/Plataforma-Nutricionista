
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Home } from './Home'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'
import { Profile } from "./Profile"
import { Consultante } from "./Consultante"
import { Receta} from './Receta'
import { Lista} from "./Consultante/lista"

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
  }, {
    path: "/profile",
    element: <Profile />,
  }, {
    path: "/consultantes",
    element: <Consultante />,
  }, {
    path: "/recetas",
    element: <Receta />,
  },{
    path: "/lista",
    element: <Lista />,
  },

]);

export const Router = () =>
  (<RouterProvider router={router} />)
