import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { Home } from "./pages/home";
import  VeiclhesDataTable  from "./pages/veiculos/listVeiculos"
import { CadastrarVeiculo } from "./pages/veiculos/cadastrarVeiculo";

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
        {
          id: 'cadastrar-veiculo',
          path: '/cadastro-veiculo',
          Component: CadastrarVeiculo
        }
      ]
    },
  ]);

  return <RouterProvider router={routes} />;
}
