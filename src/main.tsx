import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import QueryProvider from "@/providers/query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
    
  </StrictMode>
);
