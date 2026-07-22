import {
  CreateUrlInput,
  Url,
  UrlListResponse,
  UrlListResponseSchema,
  UrlSchema,
} from "@/schemas/url.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function getUserUrls(
  token: string,
  page = 1,
  limit = 10,
): Promise<UrlListResponse> {
  const response = await fetch(`${API_URL}/url?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error ?? "Não foi possível carregar seus links.");
  }

  return UrlListResponseSchema.parse(result);
}

export async function createShortUrl(
  token: string,
  data: CreateUrlInput,
): Promise<Url> {
  const response = await fetch(`${API_URL}/url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error ?? "Não foi possível encurtar a URL.");
  }

  return UrlSchema.parse(result);
}

export async function deleteShortUrl(token: string, id: number): Promise<void> {
  const response = await fetch(`${API_URL}/url/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);
    throw new Error(result?.error ?? "Não foi possível excluir o link.");
  }
}
