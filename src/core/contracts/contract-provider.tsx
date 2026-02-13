import { createContext, useContext } from "react";
import contract from "./jsons/contract.json";

export type Contract = typeof contract;

const ContractContext = createContext<Contract | null>(null);

export function ContractProvider({ children }: { children: React.ReactNode }) {
  return (
    <ContractContext.Provider value={contract}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContract(): Contract {
  const ctx = useContext(ContractContext);
  if (!ctx) {
    throw new Error("useContract must be used inside ContractProvider");
  }
  return ctx;
}
