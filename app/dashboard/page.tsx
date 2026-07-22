"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useUrl } from "../context/UrlContext";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function Dashboard() {
  const { token, user, isLoading: isAuthLoading, logout } = useAuth();
  const { createShortUrl, deleteShortUrl, userUrls, isLoading } = useUrl();
  const router = useRouter();
    const [expires, setExpires] = useState<number | null>(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Só redireciona depois do bootstrap terminar: durante ele o token ainda é
  // null mesmo para quem está logado.
  useEffect(() => {
    if (!isAuthLoading && !token) {
      router.replace("/auth/login");
    }
  }, [isAuthLoading, token, router]);

  async function handleShorten(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      // o input coleta horas; a API espera um ISO 8601
      const expiresAt = expires
        ? new Date(Date.now() + expires * 3600_000).toISOString()
        : null;

      await createShortUrl({ url, expires: expiresAt });
      setUrl("");
      setExpires(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleCopy(hashedUrl: string, id: number) {
    await navigator.clipboard.writeText(`${API_URL}/${hashedUrl}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  if (isAuthLoading || !token) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Carregando...</p>
      </main>
    );
  }

  return (
    <>
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
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
      <header className="mb-10 flex items-center justify-between">
        
        <div>
          
          <h1 className="text-2xl font-semibold tracking-tight">Seus links</h1>
          {user && (
            <p className="mt-1 text-sm text-zinc-400">Olá, {user.username}</p>
          )}
        </div>
        <button
          onClick={() => logout()}
          className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          Logout
        </button>
      </header>
          <h1 className="text-lg font-medium text-center mb-4">Gere sua URL encurtada</h1>
      <form onSubmit={handleShorten} className="flex flex-col gap-2 sm:flex-row">
        
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError(null);
          }}
          required
          placeholder="https://cole-sua-url-longa-aqui.com"
          className="h-11 flex-1 rounded-lg border border-zinc-800 bg-zinc-950 py-4 px-3.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500"
        />
        <input
          type="number"
          min={1}
          value={expires ?? ""}
          onChange={(e) =>
            setExpires(e.target.value ? Number(e.target.value) : null)
          }
          placeholder="Expira em (horas)"
          className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-500 sm:w-44"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-11 mt-4 md:mt-0 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Encurtar
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-red-900 bg-red-500/10 px-4 py-3"
        >
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
     
      <section className="mt-24">
         <h1 className="text-center mb-4 font-bold ">Seus links válidos</h1>
        {isLoading && !userUrls ? (
          <p className="text-sm text-zinc-500">Carregando seus links...</p>
        ) : !userUrls || userUrls.data.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-12 text-center">
            <p className="text-sm font-medium">Nenhum link ainda</p>
            <p className="mt-1 text-sm text-zinc-500">
              Cole uma URL acima para criar o seu primeiro.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800 border-y border-zinc-800">
            {userUrls.data.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-100">
                    {API_URL}/{item.hashedUrl}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    {item.originalUrl}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-zinc-500">
                    {item.expires
                      ? `Expira ${new Date(item.expires).toLocaleDateString("pt-BR")}`
                      : "Sem expiração"}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {item.counter} {item.counter === 1 ? "clique" : "cliques"}
                  </span>
                  <button
                    onClick={() => handleCopy(item.hashedUrl, item.id)}
                    className="rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                  >
                    {copiedId === item.id ? "Copiado" : "Copiar"}
                  </button>
                  <button
                    onClick={() => deleteShortUrl(item.id)}
                    className="rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-red-400"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {userUrls && userUrls.total > 0 && (
          <p className="mt-4 text-xs text-zinc-600">
            {userUrls.data.length} de {userUrls.total}
          </p>
        )}
      </section>
    </main>
    <Footer/>
    </>
  );
}
