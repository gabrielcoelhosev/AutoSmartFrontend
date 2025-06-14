import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { Home } from "./pages/home";
import  VeiclhesDataTable  from "./pages/veiculos/listVeiculos"

export function AppRoutes() {
    const routes = createBrowserRouter([
    {
      id: 'app',
      path: '/',
      Component: DefaultLayout,
      children: [
        {
          id: 'home',
          path: '/',
          Component: Home,
        },
        {
          id: 'veiculos',
          path: '/veiculos',
          Component: VeiclhesDataTable,
        },
      ]
    },
  ]);

  return <RouterProvider router={routes} />;
}
