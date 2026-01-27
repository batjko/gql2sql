import test from 'ava'
import gql from 'graphql-tag'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { server } from '../../server.js'
import { poemResolvers } from './index.js'

// Mock up the Poem API's response, so we avoid calling the real Poem API just for tests

const mockPoem = {
  title: 'testPoem',
  content: 'Of all the things I have lost, I miss my mind the most.',
  url: 'https://www.brainyquote.com/quotes/ozzy_osbourne_454746',
  poet: {
    name: 'Ozzy Osbourne',
    url: 'https://en.wikipedia.org/wiki/Ozzy_Osbourne',
  },
}

test.before(() => {
  const mock = new MockAdapter(axios)

  mock.onGet(/poem+/).reply(200, [mockPoem])
})

test('Poem Query succeeds without errors', async t => {
  const query = gql`
    {
      poem {
        title
      }
    }
  `
  const response = await server.executeOperation({ query })

  t.is(response.body.kind, 'single')
  const result = response.body.singleResult
  t.falsy(result?.errors, 'Poem Query returned errors.')
})

test('Poem returns correct structure', async t => {
  const query = gql`
    {
      poem {
        title
        content
        url
        poet {
          name
          url
        }
      }
    }
  `
  const response = await server.executeOperation({ query })

  t.is(response.body.kind, 'single')
  const result = response.body.singleResult
  t.deepEqual(result?.data?.poem, mockPoem, 'Poem response not as expected')
})

test('Poems Query succeeds without errors', async t => {
  const query = gql`
    {
      poems {
        title
      }
    }
  `
  const response = await server.executeOperation({ query })

  t.is(response.body.kind, 'single')
  const result = response.body.singleResult
  t.falsy(result.errors, 'Poems Query returned errors.')
})

test('(Random) Poem Query returns single Poem', async t => {
  const query = gql`
    {
      poem {
        title
      }
    }
  `
  const response = await server.executeOperation({ query })

  t.is(response.body.kind, 'single')
  const result = response.body.singleResult
  t.truthy(result?.data?.poem, 'Poem result is not returned')
})

test('Poems Query returns array', async t => {
  const query = gql`
    {
      poems {
        title
      }
    }
  `
  const response = await server.executeOperation({ query })

  t.is(response.body.kind, 'single')
  const result = response.body.singleResult
  t.truthy(Array.isArray(result?.data?.poems), 'Invalid result for Poems query')
})

test('Poem resolvers include poem and poems functions', t => {
  t.truthy(poemResolvers?.Query?.poem, 'Poem Resolver missing')
  t.true(
    typeof poemResolvers?.Query?.poem === 'function',
    'Poem resolver is not a function',
  )

  t.truthy(poemResolvers?.Query?.poems, 'Poems Resolver missing')
  t.true(
    typeof poemResolvers?.Query?.poems === 'function',
    'Poems resolver is not a function',
  )
})
