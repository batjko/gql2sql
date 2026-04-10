import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

export function loadTypeDefs() {
  const typeDefs = loadFilesSync('src/graphql/schema/**/*.graphql')
  return mergeTypeDefs(typeDefs)
}
