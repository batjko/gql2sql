import { gql } from 'apollo-server'
import { getRandomPoem, getSomePoems } from '../../providers/poems/index.js'

export const Poetry = gql`
  type Poet {
    name: String
    url: String
  }

  type Poem {
    title: String
    content: String
    url: String
    poet: Poet
  }

  extend type Query {
    # get a random Poem (from a different source)
    poem: Poem

    # get several poems
    poems: [Poem]
  }
`

export const poemResolvers = {
  poems: () => getSomePoems(),
  poem: () => getRandomPoem(),
}
