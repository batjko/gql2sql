import { describe, expect, it } from 'vitest'

import { loadEnv } from './env.js'

describe('loadEnv', () => {
  it('applies defaults for optional values', () => {
    const env = loadEnv({
      DATABASE_URL: 'file:./prisma/test.db',
    })

    expect(env.NODE_ENV).toBe('development')
    expect(env.PORT).toBe(3000)
    expect(env.POETRY_API_BASE_URL).toBe('https://poetrydb.org')
    expect(env.REQUEST_TIMEOUT_MS).toBe(5000)
  })

  it('rejects invalid input', () => {
    expect(() =>
      loadEnv({
        DATABASE_URL: '',
        PORT: '0',
        POETRY_API_BASE_URL: 'not-a-url',
      }),
    ).toThrow(/Invalid environment configuration/)
  })
})
