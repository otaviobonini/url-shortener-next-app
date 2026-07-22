import { z } from "zod";

export const CreateUrlSchema = z.object({
  url: z.string().url("Informe uma URL válida."),
  expires: z.string().datetime().nullable().optional(),
});

export const UrlSchema = z.object({
  id: z.number(),
  originalUrl: z.string(),
  hashedUrl: z.string(),
  counter: z.number(),
  expires: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  userId: z.number(),
});

export const UrlListResponseSchema = z.object({
  data: z.array(UrlSchema),
  page: z.number(),
  limit: z.number(),
  total: z.number(),
});

export type CreateUrlInput = z.infer<typeof CreateUrlSchema>;
export type Url = z.infer<typeof UrlSchema>;
export type UrlListResponse = z.infer<typeof UrlListResponseSchema>;
