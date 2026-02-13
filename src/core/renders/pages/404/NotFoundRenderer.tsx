export function NotFoundRenderer() {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-12">
      <h1 className="text-6xl font-bold text-primary">404</h1>

      <p className="text-base sm:text-lg text-primary">
        Página não encontrada.
      </p>

      <a
        href="/"
        className="mt-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition font-semibold"
      >
        Voltar para Home
      </a>
    </div>
  );
}
