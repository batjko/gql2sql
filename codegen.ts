import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'src/graphql/schema/**/*.graphql',
  generates: {
    'src/graphql/__generated__/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true,
        contextType: '../context.js#GraphQLContext',
        defaultMapper: 'unknown',
        maybeValue: 'T | null',
        scalars: {
          ID: 'string',
        },
        mappers: {
          Book: '../../generated/prisma/models/Book.js#BookModel',
          Poem: '../../services/poetry/poetry-client.js#PoemRecord',
          Poet: '../../services/poetry/poetry-client.js#PoetRecord',
        },
      },
    },
  },
}

export default config
