import test from 'ava'
import { gql } from 'apollo-server'
import { server } from '../server.js'

import { typeDefs, resolvers } from './index.js'

test('Root Query succeeds without errors', async t => {
  const result = await server.executeOperation({ query })

  t.falsy(result.errors, 'Root Query operation returned errors.')
})

test('Root Query\'s "hello" query returns "World"', async t => {
  const result = await server.executeOperation({ query })

  const query = gql`
    {
      hello
    }
  `
  t.deepEqual(
    result.data.hello,
    'World',
    'Unexpected response to "hello" query.',
  )
})

test('typeDefs has at least two elements', t => {
  t.true(
    typeDefs.length >= 2,
    "TypeDefs doesn't have at least Quyery and Mutation in it.",
  )
})

test('resolvers should have Query and Mutation properties', t => {
  t.truthy(resolvers.Query, "Root Resolver doesn't have Query property.")
  t.truthy(resolvers.Mutation, "Root Resolver doesn't have Mutation property.")
})
