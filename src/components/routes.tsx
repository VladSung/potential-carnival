import {
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import App from "../pages/Home";
import { getPokeInfo, getPokeList} from "../shared/api";
import { PokemonPage } from "../pages/info";


const router = createHashRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: "/",
        loader: async()=>(await getPokeList()).results,
        element: <App />,
      },
      {
        path: ':id',
        loader: async (params) => {
          let pokeData = await getPokeInfo(params.params.id)
          return pokeData
        },
        element: <PokemonPage />,
      }
    ]
  }
]);

export const AppRouterProvider = () => (<RouterProvider router={router} />)