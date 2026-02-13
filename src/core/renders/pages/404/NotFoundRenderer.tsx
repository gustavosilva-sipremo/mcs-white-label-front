export function NotFoundRenderer() {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>

      <p className="text-base sm:text-lg text-gray-700">
        Página não encontrada.
      </p>

      <a
        href="/"
        className="mt-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition font-semibold"
      >
        Voltar para Home
      </a>
    </div>
  );
}
