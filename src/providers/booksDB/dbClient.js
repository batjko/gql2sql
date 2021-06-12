import prisma from '@prisma/client'

const { PrismaClient } = prisma

// Re-import this client everywhere you need to access prisma, instead of re-creating new instances.
export const client = new PrismaClient()
