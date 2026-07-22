import Link from "next/link";

const API_URL = "https://url-api.otaviobonini.dev";

const features = [
  {
    title: "Contagem de cliques",
    body: "Cada acesso ao link curto é contabilizado automaticamente.",
  },
  {
    title: "Expiração opcional",
    body: "Defina uma data e o link deixa de funcionar sozinho.",
  },
  {
    title: "Redirecionamento rápido",
    body: "Cache em Redis mantém o redirect fora do banco de dados.",
  },
];

export default function Home() {
  return (
    <main className="relative flex-1">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 2px),
            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 2px)
          `,
          backgroundSize: "96px 96px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-sm font-bold tracking-tight md:text-xl">
          Bonini Encurtador de URL
        </span>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/auth/login"
            className="rounded-md px-3 py-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            Entrar
          </Link>
          <Link
            href="/auth/register"
            className="rounded-md bg-white px-3 py-1.5 font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Criar conta
          </Link>
        </nav>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-16 pb-20 text-center sm:pt-24">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Links longos, curtos e rastreáveis
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-zinc-400">
          Encurte qualquer URL, acompanhe quantos cliques ela recebeu e defina
          quando ela deve expirar.
        </p>

        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-2 sm:flex-row">
          <input
            type="url"
            readOnly
            placeholder="https://cole-sua-url-longa-aqui.com"
            className="h-11 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
          />
          <Link
            href="/auth/register"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Encurtar
          </Link>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Grátis, sem cartão. Leva menos de um minuto.
        </p>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-4xl gap-4 px-6 pb-24 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-lg"
          >
            <h2 className="text-sm font-medium">{feature.title}</h2>
            <p className="mt-1.5 text-sm text-zinc-400">{feature.body}</p>
          </div>
        ))}
      </section>

      <footer className="relative z-10 border-t border-zinc-800">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-zinc-500 sm:flex-row">
          <span>Otávio Bonini — Todos os direitos reservados</span>
          <div className="flex items-center gap-4">
            <a
              href={`${API_URL}/docs`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              Documentação da API
            </a>
            <a
              href="https://github.com/otaviobonini/url-shortener-api"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
