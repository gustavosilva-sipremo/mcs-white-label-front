// NotFoundRenderer.tsx
import sipremoLogo from "/favicons/sipremo.svg";

export function NotFoundRenderer() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen p-4 bg-background text-foreground">
      {/* ---------------- Background pattern ---------------- */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)/0.1) 2px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)/0.1) 2px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ---------------- Watermark Logo ---------------- */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none select-none">
        <img
          src={sipremoLogo}
          alt="Sipremo Logo"
          className="absolute -left-[50%] w-[200%] top-1/2 transform -translate-y-1/2 opacity-20 invert"
        />
      </div>

      {/* ---------------- Conteúdo Principal ---------------- */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-gray-700">Página não encontrada.</p>
        <a
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition font-semibold"
        >
          Voltar para Home
        </a>
      </div>
    </div>
  );
}
