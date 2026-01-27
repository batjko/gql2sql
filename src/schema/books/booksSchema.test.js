import test from 'ava'
import gql from 'graphql-tag'

import { server } from '../../server.js'
import { bookResolvers } from './index.js'
import { client } from '../../providers/booksDB/dbClient.js'

// Helper to extract result from Apollo Server 5 response
const getResult = (response) => {
  if (response.body.kind !== 'single') {
    throw new Error('Expected single result')
  }
  return response.body.singleResult
}

// Helper to create a test book via mutation
const createTestBook = async (title = `Test Book ${Date.now()}`, author = 'Test Author') => {
  const mutation = gql`
    mutation AddBook($title: String, $author: String) {
      addBook(title: $title, author: $author) {
        id
        title
        author
      }
    }
  `
  const response = await server.executeOperation({
    query: mutation,
    variables: { title, author }
  })
  return getResult(response).data.addBook
}

// Clean up after all tests
test.after.always(async () => {
  await client.$disconnect()
})

// ============================================
// Resolver structure tests
// ============================================

test('Book resolvers include all expected functions', t => {
  t.truthy(bookResolvers?.Query?.books, 'books resolver missing')
  t.true(typeof bookResolvers.Query.books === 'function', 'books resolver is not a function')

  t.truthy(bookResolvers?.Query?.book, 'book resolver missing')
  t.true(typeof bookResolvers.Query.book === 'function', 'book resolver is not a function')

  t.truthy(bookResolvers?.Mutation?.addBook, 'addBook resolver missing')
  t.true(typeof bookResolvers.Mutation.addBook === 'function', 'addBook resolver is not a function')
})

// ============================================
// Query tests
// ============================================

test('books query returns an array', async t => {
  const query = gql`
    query {
      books {
        id
        title
        author
      }
    }
  `
  const response = await server.executeOperation({ query })
  const result = getResult(response)

  t.falsy(result.errors, 'books query returned errors')
  t.true(Array.isArray(result.data?.books), 'books should return an array')
})

test('books query returns books with correct structure', async t => {
  // Ensure at least one book exists
  await createTestBook('Structure Test Book', 'Structure Author')

  const query = gql`
    query {
      books {
        id
        title
        author
      }
    }
  `
  const response = await server.executeOperation({ query })
  const result = getResult(response)

  t.falsy(result.errors)
  t.true(result.data.books.length >= 1, 'Should have at least one book')

  const book = result.data.books[0]
  t.truthy(book.id, 'Book should have an id')
  t.truthy(book.title, 'Book should have a title')
  t.truthy(book.author, 'Book should have an author')
})

test('book query returns a single book by id', async t => {
  // Create a book to query
  const createdBook = await createTestBook('Single Query Test', 'Query Author')
  const bookId = createdBook.id

  const query = gql`
    query GetBook($id: ID!) {
      book(id: $id) {
        id
        title
        author
      }
    }
  `
  const response = await server.executeOperation({
    query,
    variables: { id: bookId }
  })
  const result = getResult(response)

  t.falsy(result.errors, 'book query returned errors')
  t.truthy(result.data?.book, 'book query should return a book')
  t.is(result.data.book.id, bookId, 'Returned book should have the requested id')
  t.is(result.data.book.title, 'Single Query Test')
  t.is(result.data.book.author, 'Query Author')
})

test('book query returns null for non-existent id', async t => {
  const query = gql`
    query GetBook($id: ID!) {
      book(id: $id) {
        id
        title
        author
      }
    }
  `
  const response = await server.executeOperation({
    query,
    variables: { id: '99999' }
  })
  const result = getResult(response)

  t.falsy(result.errors, 'Should not return errors for non-existent book')
  t.is(result.data?.book, null, 'Should return null for non-existent book')
})

// ============================================
// Mutation tests
// ============================================

test('addBook mutation creates a new book', async t => {
  const mutation = gql`
    mutation AddBook($title: String, $author: String) {
      addBook(title: $title, author: $author) {
        id
        title
        author
      }
    }
  `
  const testTitle = `Test Book ${Date.now()}`
  const testAuthor = 'Test Author'

  const response = await server.executeOperation({
    query: mutation,
    variables: { title: testTitle, author: testAuthor }
  })
  const result = getResult(response)

  t.falsy(result.errors, 'addBook mutation returned errors')
  t.truthy(result.data?.addBook, 'addBook should return the created book')
  t.truthy(result.data.addBook.id, 'Created book should have an id')
  t.is(result.data.addBook.title, testTitle, 'Created book should have the correct title')
  t.is(result.data.addBook.author, testAuthor, 'Created book should have the correct author')
})

test('addBook mutation - created book can be retrieved', async t => {
  const mutation = gql`
    mutation AddBook($title: String, $author: String) {
      addBook(title: $title, author: $author) {
        id
        title
        author
      }
    }
  `
  const testTitle = `Retrievable Book ${Date.now()}`
  const testAuthor = 'Another Author'

  // Create the book
  const createResponse = await server.executeOperation({
    query: mutation,
    variables: { title: testTitle, author: testAuthor }
  })
  const createResult = getResult(createResponse)
  const createdId = createResult.data.addBook.id

  // Retrieve it
  const query = gql`
    query GetBook($id: ID!) {
      book(id: $id) {
        id
        title
        author
      }
    }
  `
  const getResponse = await server.executeOperation({
    query,
    variables: { id: createdId }
  })
  const getResult_ = getResult(getResponse)

  t.falsy(getResult_.errors)
  t.is(getResult_.data.book.id, createdId)
  t.is(getResult_.data.book.title, testTitle)
  t.is(getResult_.data.book.author, testAuthor)
})

// ============================================
// Field selection tests
// ============================================

test('books query respects field selection', async t => {
  const query = gql`
    query {
      books {
        title
      }
    }
  `
  const response = await server.executeOperation({ query })
  const result = getResult(response)

  t.falsy(result.errors)
  const book = result.data.books[0]
  t.truthy(book.title, 'Should have title')
  t.is(book.id, undefined, 'Should not have id when not requested')
  t.is(book.author, undefined, 'Should not have author when not requested')
})
