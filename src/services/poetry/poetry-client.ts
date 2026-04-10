export interface PoetryApiPoem {
  title: string
  author: string
  lines: string[]
  linecount: string
}

export interface PoetRecord {
  name: string
}

export interface PoemRecord {
  title: string
  content: string
  lineCount: number
  poet: PoetRecord
}

export interface PoetryClientOptions {
  baseUrl: string
  timeoutMs: number
  fetchImpl?: typeof fetch
}

export class PoetryClient {
  private readonly fetchImpl: typeof fetch

  public constructor(private readonly options: PoetryClientOptions) {
    this.fetchImpl = options.fetchImpl ?? fetch
  }

  public async getRandomPoem() {
    const poems = await this.getSomePoems(1)
    const [poem] = poems

    if (!poem) {
      throw new Error('Poetry provider returned no poems.')
    }

    return poem
  }

  public getSomePoems(count = 3) {
    return this.request<PoetryApiPoem[]>(`/random/${count}`).then(poems =>
      poems.map(poem => ({
        title: poem.title,
        content: poem.lines.join('\n'),
        lineCount: Number(poem.linecount),
        poet: {
          name: poem.author,
        },
      })),
    )
  }

  private async request<T>(path: string): Promise<T> {
    const response = await this.fetchImpl(`${this.options.baseUrl}${path}`, {
      signal: AbortSignal.timeout(this.options.timeoutMs),
      headers: {
        accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Poetry provider request failed with status ${response.status}.`)
    }

    try {
      return (await response.json()) as T
    } catch (error) {
      throw new Error(`Poetry provider returned invalid JSON: ${String(error)}`)
    }
  }
}
