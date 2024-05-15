import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import { getPokeInfo, getPokeList} from "../shared/api";
import { PokemonPage } from "../pokemon-page";


const router = createBrowserRouter([
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
          console.log(params);
          let pokeData = await getPokeInfo(params.params.id)
          return pokeData
        },
        element: <PokemonPage />,
      }
    ]
  }
]);

export const AppRouterProvider = () => (<RouterProvider router={router} />)