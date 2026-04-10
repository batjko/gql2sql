import type { PrismaClient } from '../../generated/prisma/client.js'

export interface CreateBookRecordInput {
  title: string
  author: string
}

export class BookRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public listBooks() {
    return this.prisma.book.findMany({
      orderBy: { id: 'asc' },
    })
  }

  public getBookById(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    })
  }

  public createBook(input: CreateBookRecordInput) {
    return this.prisma.book.create({
      data: input,
    })
  }
}
