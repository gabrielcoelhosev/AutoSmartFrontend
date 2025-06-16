import { AppRoutes } from "./app-routes";
import { ThemeProvider } from "./components/theme-provider";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </>
  )
}
