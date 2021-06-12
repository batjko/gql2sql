# GQL 2 SQL

Simple example of a GraphQL server that connects to a SQL backend.
To demonstrate this, we're using Apollo and Prisma respectively.

It's also accessing data from elsewhere, to demonstrate how GraphQL combines multiple sources.

## Technologies involved

- Node 15.3+ (because of [modules](https://blog.logrocket.com/es-modules-in-node-today/) and [top-level async/await](https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/#top-level-%60await%60-is-available-%22unflagged%22-in-node.js-since-%60v14.8%60))
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/) (the GraphQL part)
- [Prisma](https://github.com/prisma/prisma) (for the SQL part)
- Axios (to call a Poem API as the second data source)

Also a few development convenience things, like [Nodemon](https://www.npmjs.com/package/nodemon) and the [prisma cli](https://www.prisma.io/docs/reference/api-reference/command-reference/).

## How does it work

**TODO**

### Folder structure

**TODO**

### GraphQL

**TODO**

### SQL

**TODO**

## Running the server

1. Clone repo
2. `npm install`
3. `npm start` launches nodemon for easy development

## Run some queries

Apollo Server comes with a querying UI out of the box.

Simply visit http://localhost:3000 and execute a GraphQL query, e.g.:

```gql
{
  books {
    id
    title
    author
  }
}
```

## TODO

- [ ] Add a mutation
- [x] Add a second data source
- [ ] Add a diagram of the architecture
- [ ] Document code more comprehensively
- [ ] Finish ReadMe
- [ ] Maybe add a few tests?
