"use client";


import { useAuth } from "@/app/context/AuthContext";
import { LoginUserInput, LoginUserSchema } from "@/schemas/user.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const {login} = useAuth()
  const router = useRouter();
  const [data, setData] = useState<LoginUserInput>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = LoginUserSchema.safeParse(data);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    try {
      await login(parsed.data);
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

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
          <Link
            href="/"
            className="text-sm font-bold tracking-tight text-zinc-400 transition-colors hover:text-white"
          >
            Bonini Encurtador
          </Link>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            Entrar na sua conta
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Acesse seus links e veja os cliques.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-900 bg-red-500/10 px-4 py-3"
          >
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
  value={data.email}
  onChange={(e) => {
    setData({ ...data, email: e.target.value });
    setError(null);
  }}
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
  value={data.password}
  onChange={(e) => {
    setData({ ...data, password: e.target.value });
    setError(null);
  }}
  autoComplete="current-password"
  placeholder="••••••••"
  className="h-11 rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500"
/>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Não tem conta?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-white underline-offset-4 hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}
