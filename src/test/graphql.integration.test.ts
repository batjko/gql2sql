import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { createApp } from '../app.js'
import type { AppEnv } from '../config/env.js'
import { createLogger } from '../config/logger.js'
import { createPrismaClient } from '../data/prisma/client.js'
import type { PrismaClient } from '../generated/prisma/client.js'
import { resetBooks } from './test-database.js'

describe('GraphQL API', () => {
  let prisma: PrismaClient
  let server: Awaited<ReturnType<typeof createApp>>
  const env: AppEnv = {
    NODE_ENV: 'test',
    PORT: 0,
    DATABASE_URL: 'file:./prisma/test.db',
    POETRY_API_BASE_URL: 'https://poetrydb.test',
    REQUEST_TIMEOUT_MS: 1000,
  }

  beforeAll(async () => {
    prisma = createPrismaClient(env.DATABASE_URL)
    await resetBooks(prisma)
    server = await createApp({
      env,
      logger: createLogger(),
      prisma,
    })
  })

  beforeEach(async () => {
    await resetBooks(prisma)
  })

  afterAll(async () => {
    await server.apollo.stop()
    await prisma.$disconnect()
  })

  it('answers the root hello query', async () => {
    const response = await request(server.app).post('/graphql').send({
      query: '{ hello }',
    })

    expect(response.status).toBe(200)
    expect(response.body.data).toEqual({ hello: 'World' })
  })

  it('lists books from SQLite', async () => {
    const response = await request(server.app).post('/graphql').send({
      query: '{ books { id title author } }',
    })

    expect(response.status).toBe(200)
    expect(response.body.data.books).toHaveLength(2)
    expect(response.body.data.books[0]).toMatchObject({
      id: expect.any(String),
      title: 'The Awakening',
      author: 'Kate Chopin',
    })
    expect(response.body.data.books[1]).toMatchObject({
      id: expect.any(String),
      title: 'City of Glass',
      author: 'Paul Auster',
    })
  })

  it('creates a book via the input-object mutation', async () => {
    const response = await request(server.app)
      .post('/graphql')
      .send({
        query: `
        mutation AddBook($input: AddBookInput!) {
          addBook(input: $input) {
            id
            title
            author
          }
        }
      `,
        variables: {
          input: {
            title: 'Kindred',
            author: 'Octavia E. Butler',
          },
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.data.addBook).toMatchObject({
      title: 'Kindred',
      author: 'Octavia E. Butler',
    })
  })

  it('surfaces provider errors for poetry queries', async () => {
    const response = await request(server.app).post('/graphql').send({
      query: '{ poem { title } }',
    })

    expect(response.status).toBe(200)
    expect(response.body.errors?.[0]?.message).toMatch(/fetch failed|Poetry provider/)
  })

  it('reports validation issues for bad book ids', async () => {
    const response = await request(server.app).post('/graphql').send({
      query: 'query { book(id: "not-a-number") { id } }',
    })

    expect(response.status).toBe(200)
    expect(response.body.errors?.[0]?.message).toContain('Invalid book id')
  })
})
