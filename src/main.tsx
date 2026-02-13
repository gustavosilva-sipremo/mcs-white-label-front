import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import {
  ContractProvider,
  useContract,
} from "./core/contracts/contract-provider";
import { ThemeProvider } from "./core/theme/theme-provider";

/**
 * Responsável apenas por aplicar efeitos globais
 * derivados do contrato (HTML, metadata, etc).
 */
function ContractBootstrap() {
  const contract = useContract();

  useEffect(() => {
    // App identity
    document.title = contract.app.name;
    document.documentElement.lang = contract.app.language;
  }, [contract.app.name, contract.app.language]);

  return <App />;
}

// Root safety
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("MCS White Label: root element not found");
}

// Render tree
createRoot(rootElement).render(
  <StrictMode>
    <ContractProvider>
      <ThemeProvider>
        <ContractBootstrap />
      </ThemeProvider>
    </ContractProvider>
  </StrictMode>,
);
