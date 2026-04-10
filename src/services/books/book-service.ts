import type { BookRepository } from '../../data/books/book-repository.js'

export interface AddBookInput {
  title: string
  author: string
}

export class BookService {
  public constructor(private readonly repository: BookRepository) {}

  public listBooks() {
    return this.repository.listBooks()
  }

  public async getBookById(id: string) {
    return this.repository.getBookById(this.parseId(id))
  }

  public async addBook(input: AddBookInput) {
    const title = input.title.trim()
    const author = input.author.trim()

    if (!title || !author) {
      throw new Error('Both title and author are required.')
    }

    return this.repository.createBook({ title, author })
  }

  private parseId(id: string) {
    const parsed = Number(id)

    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new Error(`Invalid book id: ${id}`)
    }

    return parsed
  }
}
