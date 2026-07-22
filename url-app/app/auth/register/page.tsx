import Link from "next/link";

export default function Register() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
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

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
        
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Faça seu cadastro e comece a encurtar links agora mesmo.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 h-96 bg-zinc-900 p-6 sm:p-8">
          <form className="flex flex-col gap-4">
               <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-sm font-medium text-zinc-300"
              >
                Nome de usuário
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="usuario"
                className="h-11 rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                className="h-11 rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-300"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="h-11 rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              Cadastrar
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Já tem conta?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-white underline-offset-4 hover:underline"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  );
}
