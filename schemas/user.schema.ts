import { z } from "zod";

export const AuthUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
});

export const CreateUserSchema = z.object({
  email: z.string().email("O email deve ser válido"),
  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres").max(20, "O nome de usuário deve ter no máximo 20 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").max(20, "A senha deve ter no máximo 20 caracteres"),
});

export const CreateUserResponseSchema = AuthUserSchema;

export const LoginUserSchema = z.object({
  email: z.string().email("O email deve ser válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").max(20, "A senha deve ter no máximo 20 caracteres"),
});

export const LoginUserResponseSchema = AuthUserSchema.extend({
  token: z.string(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type LoginUserResponse = z.infer<typeof LoginUserResponseSchema>;
