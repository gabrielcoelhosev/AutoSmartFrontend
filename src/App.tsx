import { AppRoutes } from "./app-routes";
import { SidebarProvider } from "./components/ui/sidebar";

export function App() {
  return (
    <>
      <SidebarProvider>
        <AppRoutes />
      </SidebarProvider>
    </>
  )
}
