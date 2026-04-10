# GQL 2 SQL

`gql2sql` is a teaching-focused example of how to build a modern GraphQL API on top of SQL without stopping at the database. The app exposes books from SQLite through Prisma, combines that with poetry data from a public API, and keeps the codebase structured the way current TypeScript projects are usually built.

## What this repo demonstrates

- Apollo Server 5 mounted on Express 5
- Prisma ORM 7 with SQLite and driver adapters
- strict TypeScript with generated GraphQL resolver types
- Biome for formatting and linting
- GraphQL SDL in `.graphql` files instead of inline strings
- HTTP-level integration tests with Vitest and Supertest
- agent-friendly repository conventions via `AGENTS.md`

## Requirements

- Node 22 or newer
- npm 10 or newer

## Architecture

![Design](/images/architecture.png)

The request flow is intentionally simple and explicit:

1. Express receives HTTP requests and Apollo handles GraphQL execution at `/graphql`.
2. SDL files in `src/graphql/schema` define the public contract.
3. Typed resolvers translate GraphQL operations into service calls.
4. Services coordinate domain rules and delegate persistence to repositories.
5. Prisma talks to SQLite for books, while a dedicated poetry client fetches a second upstream data source.

This separation keeps the repo readable for learners and gives coding agents a clear place to make targeted changes.

## Project layout

- `src/server.ts`: startup, env loading, graceful shutdown
- `src/app.ts`: Express and Apollo composition
- `src/config`: environment parsing and logging
- `src/graphql`: SDL files, generated resolver types, and resolvers
- `src/services`: domain services and the poetry API client
- `src/data`: Prisma client factory and repositories
- `prisma`: schema, migrations, and seed script

![Prisma Model autocomplete](/images/PrismaAutocomplete.png)

## Quickstart

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

3. Generate the Prisma client, apply the committed migration, and seed the database:

   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000/graphql`.

Apollo Sandbox is enabled in development, so you can browse the schema and execute operations directly in the browser.

## Example operations

Query all books:

```graphql
query GetBooks {
  books {
    id
    title
    author
    createdAt
  }
}
```

Query one book by id:

```graphql
query GetBook($id: ID!) {
  book(id: $id) {
    id
    title
    author
  }
}
```

Create a book with a modern input object:

```graphql
mutation AddBook($input: AddBookInput!) {
  addBook(input: $input) {
    id
    title
    author
  }
}
```

Variables:

```json
{
  "input": {
    "title": "Kindred",
    "author": "Octavia E. Butler"
  }
}
```

Query poems from the external provider:

```graphql
query GetPoetry {
  poem {
    title
    content
    lineCount
    poet {
      name
    }
  }
  poems {
    title
    poet {
      name
    }
  }
}
```

<img width="1422" height="645" alt="image" src="https://github.com/user-attachments/assets/3fb26734-8341-424c-8f59-2c8d4d9fed00" />

## Scripts

- `npm run dev`: watch mode with `tsx`
- `npm run build`: generate Prisma client, run GraphQL codegen, and compile TypeScript
- `npm run typecheck`: strict TypeScript verification
- `npm run lint`: Biome checks
- `npm run format`: Biome formatting
- `npm run test`: Vitest suite
- `npm run db:generate`: Prisma client generation
- `npm run db:migrate`: apply the committed migration set
- `npm run db:reset`: reset the local database
- `npm run db:seed`: seed the database
- `npm run db:studio`: open Prisma Studio

## QA workflow

Run the same checks expected in CI:

```bash
npm run lint
npm run typecheck
npm run test
```

For a clean local reset:

```bash
npm run db:reset
npm run db:seed
```

## Notes for contributors and agents

- Keep schema changes in `.graphql` files and regenerate types with `npm run codegen`.
- Keep persistence logic out of resolvers.
- If the Prisma schema changes, rerun `npm run db:generate` and update migrations.
- To author a brand-new Prisma migration locally, use `npx prisma migrate dev --name <change>` on Node 22 and commit the generated SQL.
- See `AGENTS.md` for repository-specific coding guidance.
