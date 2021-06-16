import test from 'ava'
import { gql } from 'apollo-server'
import { server } from '../../server.js'

import { poemResolvers } from './index.js'

test('Poem Query succeeds without errors', async t => {
  const query = gql`
    {
      poem {
        title
      }
    }
  `
  const result = await server.executeOperation({ query })

  t.falsy(result.errors, 'Poem Query returned errors.')
})

test('Poems Query succeeds without errors', async t => {
  const query = gql`
    {
      poems {
        title
      }
    }
  `
  const result = await server.executeOperation({ query })

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
  const result = await server.executeOperation({ query })

  t.truthy(result.data.poem, 'Poem result is not returned')
})

test('Poems Query returns array', async t => {
  const query = gql`
    {
      poems {
        title
      }
    }
  `
  const result = await server.executeOperation({ query })

  t.truthy(Array.isArray(result.data.poems), 'Poems not being returned')
})

test('Poem resolvers include poem and poems functions', t => {
  t.truthy(poemResolvers.Query.poem, 'Poem Resolver missing')
  t.true(
    typeof poemResolvers.Query.poem === 'function',
    'Poem resolver is not a function',
  )

  t.truthy(poemResolvers.Query.poems, 'Poems Resolver missing')
  t.true(
    typeof poemResolvers.Query.poems === 'function',
    'Poems resolver is not a function',
  )
})
