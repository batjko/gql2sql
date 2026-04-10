import { BookRepository } from '../../data/books/book-repository.js'
import { BookService } from '../../services/books/book-service.js'
import type { Resolvers } from '../__generated__/resolvers-types.js'

export const resolvers = {
  Query: {
    hello: () => 'World',
    books: async (_parent, _args, context) => {
      const service = new BookService(new BookRepository(context.prisma))
      return service.listBooks()
    },
    book: async (_parent, args, context) => {
      const service = new BookService(new BookRepository(context.prisma))
      return service.getBookById(args.id)
    },
    poem: async (_parent, _args, context) => context.poetryClient.getRandomPoem(),
    poems: async (_parent, _args, context) => context.poetryClient.getSomePoems(),
  },
  Mutation: {
    addBook: async (_parent, args, context) => {
      const service = new BookService(new BookRepository(context.prisma))
      return service.addBook(args.input)
    },
  },
  Book: {
    id: book => String(book.id),
    createdAt: book => book.createdAt.toISOString(),
    updatedAt: book => book.updatedAt.toISOString(),
  },
} satisfies Resolvers
