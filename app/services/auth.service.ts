import {
  CreateUserInput,
  CreateUserResponse,
  CreateUserResponseSchema,
  LoginUserInput,
  LoginUserResponse,
  LoginUserResponseSchema,
} from "@/schemas/user.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function register(
  data: CreateUserInput,
): Promise<CreateUserResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error ?? "Não foi possível criar a conta.");
  }

  return CreateUserResponseSchema.parse(result);
}

export async function login(
  data: LoginUserInput,
): Promise<LoginUserResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error ?? "Email ou senha inválidos.");
  }

  return LoginUserResponseSchema.parse(result);
}

export async function renewAccessToken(): Promise<LoginUserResponse> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error("Não foi possível renovar o token de acesso.");
    }
    const result = await response.json();
    return result;
}

export async function logout(): Promise<void> {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error("Não foi possível fazer logout.");
    }
}
