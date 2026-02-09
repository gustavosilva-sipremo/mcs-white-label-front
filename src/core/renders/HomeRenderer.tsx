import { useContract } from "../contracts/contract-provider";

export function HomeRenderer() {
  const contract = useContract();

  /**
   * Guard de render
   */
  if (!contract.renders.home?.enabled) {
    return null;
  }

  return (
    <section className="relative flex flex-1 flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Base */}
        <div className="absolute inset-0 bg-background" />

        {/* Glow central */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.2),transparent_60%)]" />

        {/* Gradiente ambiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:to-primary/20" />

        {/* Grid refinado */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground) / 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground) / 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="max-w-md p-6 mx-auto transition-all duration-300 border rounded-xl bg-card/90 text-card-foreground border-border shadow-sm hover:shadow-md backdrop-blur-sm">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-primary">
            Lorem Ipsum
          </h1>
          <p className="text-sm leading-relaxed text-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor fuga
            reprehenderit, dolorum est esse veritatis assumenda tempora
            repellendus tenetur asperiores molestias aspernatur sint a
            exercitationem similique laudantium sequi? Dolore, porro!
          </p>
        </div>
      </div>
    </section>
  );
}
