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
    <section className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      {/* Conteúdo */}
      <div className="max-w-md p-6 mx-auto transition-colors duration-300 border-2 rounded-xl bg-card text-card-foreground border-primary shadow-sm hover:shadow-md">
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
    </section>
  );
}
