import { describe, expect, it, vi } from 'vitest'

import { BookService } from './book-service.js'

describe('BookService', () => {
  it('trims whitespace before creating a book', async () => {
    const repository = {
      createBook: vi.fn().mockResolvedValue({ id: 1, title: 'Dune', author: 'Frank Herbert' }),
      getBookById: vi.fn(),
      listBooks: vi.fn(),
    }
    const service = new BookService(repository as never)

    await service.addBook({ title: '  Dune ', author: ' Frank Herbert  ' })

    expect(repository.createBook).toHaveBeenCalledWith({
      title: 'Dune',
      author: 'Frank Herbert',
    })
  })

  it('rejects blank input values', async () => {
    const repository = {
      createBook: vi.fn(),
      getBookById: vi.fn(),
      listBooks: vi.fn(),
    }
    const service = new BookService(repository as never)

    await expect(service.addBook({ title: ' ', author: ' ' })).rejects.toThrow(
      /Both title and author are required/,
    )
  })
})
