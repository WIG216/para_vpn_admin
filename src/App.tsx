import "./global.css";
import AppHeader from "./components/AppHeader/AppHeader";
import AppTable from "./components/AppTable/AppTable";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import { ModalProvider } from "./providers/modal-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppHeader />
      <AppTable />
      <ModalProvider />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
