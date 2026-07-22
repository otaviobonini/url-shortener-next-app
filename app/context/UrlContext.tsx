'use client';
import { CreateUrlInput, Url, UrlListResponse,  } from "@/schemas/url.schema";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
    getUserUrls as getUserUrlsRequest,
    createShortUrl as createShortUrlRequest,
    deleteShortUrl as deleteShortUrlRequest,
} from "../services/url.service";

interface UrlContextType {
    getUserUrls: (page?: number, limit?: number) => Promise<UrlListResponse>;
    createShortUrl: (data: CreateUrlInput) => Promise<Url>;
    deleteShortUrl: (id: number) => Promise<void>;
    userUrls: UrlListResponse | null;
    isLoading: boolean;
}

const UrlContext = createContext<UrlContextType | null>(null)

export function UrlProvider({ children }: { children: React.ReactNode }) {
    const [userUrls, setUserUrls] = useState<UrlListResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {token} = useAuth();

    useEffect(() => {
        if (!token) return;

        // capturado aqui para o TypeScript manter o estreitamento dentro da
        // função assíncrona, e para a resposta pertencer a este token
        const auth = token;
        let ignore = false;

        async function loadUrls() {
            setIsLoading(true);
            try {
                const result = await getUserUrlsRequest(auth, 1, 10);
                if (!ignore) setUserUrls(result);
            } catch (err) {
                if (!ignore) console.error(err);
            } finally {
                if (!ignore) setIsLoading(false);
            }
        }

        loadUrls();
        return () => {
            ignore = true;
        };
    }, [token]);


    function requireToken(): string {
        if (!token) throw new Error("Sessão expirada. Faça login novamente.");
        return token;
    }

     async function getUserUrls(page = 1, limit = 10): Promise<UrlListResponse> {
        const auth = requireToken();
        setIsLoading(true);
        try {
            const result = await getUserUrlsRequest(auth, page, limit);
            setUserUrls(result);
            return result;
        } finally {
            setIsLoading(false);
        }
    }

     async function createShortUrl(data: CreateUrlInput): Promise<Url> {
        const auth = requireToken();
        setIsLoading(true);
        try {
            const url = await createShortUrlRequest(auth, data);
            // insere no topo da lista em memória, sem refazer a requisição
            setUserUrls((current) =>
                current
                    ? { ...current, data: [url, ...current.data], total: current.total + 1 }
                    : current,
            );
            return url;
        } finally {
            setIsLoading(false);
        }
    }

     async function deleteShortUrl(id: number): Promise<void> {
        const auth = requireToken();
        setIsLoading(true);
        try {
            await deleteShortUrlRequest(auth, id);
            setUserUrls((current) =>
                current
                    ? {
                          ...current,
                          data: current.data.filter((url) => url.id !== id),
                          total: current.total - 1,
                      }
                    : current,
            );
        } finally {
            setIsLoading(false);
        }
    }

      return (
    <UrlContext.Provider
      value={{
        getUserUrls,
        createShortUrl,
        deleteShortUrl,
        // sem sessão não expõe lista: evita a lista antiga piscar depois de
        // sair ou ao entrar com outra conta
        userUrls: token ? userUrls : null,
        isLoading,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}

export function useUrl() {
  const context = useContext(UrlContext);
  if (!context) throw new Error("No context");
  return context;
}
