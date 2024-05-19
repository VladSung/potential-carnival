import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { getPokeList } from "../shared/api";
import PokemonInfoPage from "../pages/info";
import PokemonListPage from "../pages";
import { NotFound } from "../shared/not-found";
import { Root } from "./root";


const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "/",
        loader: async () => (await getPokeList()).results,
        element: <PokemonListPage />,
      },
      {
        path: ':id',
        element: <PokemonInfoPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ]
  }
]);

export const AppRouterProvider = () => (<RouterProvider router={router} />)