import { describe, expect, it, vi } from 'vitest'

import { PoetryClient } from './poetry-client.js'

describe('PoetryClient', () => {
  it('maps PoetryDB responses into the GraphQL shape', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          title: 'O Captain! My Captain!',
          author: 'Walt Whitman',
          lines: ['O Captain! my Captain!', 'our fearful trip is done;'],
          linecount: '2',
        },
      ],
    })
    const client = new PoetryClient({
      baseUrl: 'https://poetrydb.org',
      timeoutMs: 1000,
      fetchImpl: fetchImpl as typeof fetch,
    })

    const poems = await client.getSomePoems(1)

    expect(fetchImpl).toHaveBeenCalledWith('https://poetrydb.org/random/1', expect.any(Object))
    expect(poems).toEqual([
      {
        title: 'O Captain! My Captain!',
        content: 'O Captain! my Captain!\nour fearful trip is done;',
        lineCount: 2,
        poet: {
          name: 'Walt Whitman',
        },
      },
    ])
  })

  it('throws a normalized error for upstream failures', async () => {
    const client = new PoetryClient({
      baseUrl: 'https://poetrydb.org',
      timeoutMs: 1000,
      fetchImpl: vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      }) as typeof fetch,
    })

    await expect(client.getRandomPoem()).rejects.toThrow(/status 503/)
  })
})
