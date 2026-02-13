import { useContract } from "@/core/contracts/contract-provider";

export function Footer() {
  const { app } = useContract();

  return (
    <footer className="border-t border-border bg-background px-6 py-4 text-sm text-muted-foreground">
      © {new Date().getFullYear()} {app.name}
    </footer>
  );
}
