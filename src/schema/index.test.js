import test from 'ava'
import { gql } from 'apollo-server'
import { server } from '../server.js'

const query = gql`
  {
    hello
  }
`

test('Root Query succeeds', async t => {
  const result = await server.executeOperation({ query })

  t.falsy(result.errors, 'Root Query operation returned errors.')
  t.deepEqual(
    result.data.hello,
    'World',
    'Unexpected response to "hello" query.',
  )
})

test('Sum numbers', t => {
  const sum = 1 + 2
  const expectedResult = 3
  t.deepEqual(sum, expectedResult)
})
