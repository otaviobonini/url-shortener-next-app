# url-shortener-next-app

Front-end do encurtador de URL — dashboard para criar links curtos, acompanhar cliques e definir expiração.

Consome a [url-shortener-api](https://github.com/otaviobonini/url-shortener-api), disponível em `https://url-api.otaviobonini.dev`.

## Tecnologias

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Rodando localmente

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o ambiente

Crie um `.env.local` na raiz:

```env
NEXT_PUBLIC_API_URL=https://url-api.otaviobonini.dev
```

### 3. Inicie o servidor

```bash
npm run dev
```

Disponível em `http://localhost:3000`.

## Rotas

| Rota              | Descrição                                  |
| ----------------- | ------------------------------------------ |
| `/`               | Landing pública                            |
| `/auth/login`     | Login                                      |
| `/auth/register`  | Cadastro                                   |
| `/dashboard`      | Criar e gerenciar links (requer login)     |

## Autenticação

A API entrega o access token no corpo da resposta e o refresh token em um cookie `httpOnly`.
Por isso todas as chamadas autenticadas usam `credentials: "include"`, e o controle de
sessão acontece no cliente — o servidor do Next não enxerga esse cookie, que pertence ao
domínio da API.

## Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm start        # Servidor de produção
npm run lint     # ESLint
```
