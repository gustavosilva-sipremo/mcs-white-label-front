import { useContract } from "@/core/contracts/contract-provider";

export function Footer() {
  const { app } = useContract();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-6 py-4 text-sm text-muted-foreground shadow-inner w-full flex items-center justify-between">
      <span>
        © {year} <strong>{app.name}</strong>
      </span>
      <span className="hidden sm:block text-xs text-muted-foreground/70">
        Environment:{" "}
        <span className="capitalize text-green-500">Development</span>
      </span>
    </footer>
  );
}
