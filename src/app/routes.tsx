import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { Flex, Loader } from "@mantine/core";

import { getPokeList } from "../shared/api";
import { NotFound } from "../shared/not-found";
import { Root } from "./root";
import PokemonListPage from "../pages";

const PokemonInfoPage = lazy(() => import('../pages/info'));

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "/",
        loader: async () => (await getPokeList()).results,
        element: <PokemonListPage />
      },
      {
        path: ':id',
        element: <Suspense fallback={<Flex justify='center' align='center'><Loader /></Flex>}>
          <PokemonInfoPage />
        </Suspense>,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ]
  }
]);

export const AppRouterProvider = () => (<RouterProvider router={router} />)