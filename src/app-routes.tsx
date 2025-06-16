import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { Home } from "./pages/home";
import  VeiclhesDataTable  from "./pages/veiculos/listVeiculos"
import { CadastrarVeiculo } from "./pages/veiculos/cadastrarVeiculo";
import ClientesDataTable from "./pages/clientes/listClientes";
import { CadastrarCliente } from "./pages/clientes/cadastrarClientes";

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
        },
        {
          id: 'clientes',
          path: '/clientes',
          Component: ClientesDataTable,
        },
        {
          id: 'cadastrar-cliente',
          path: '/cadastro-cliente',
          Component: CadastrarCliente,
        },

      ]
    },
  ]);

  return <RouterProvider router={routes} />;
}
