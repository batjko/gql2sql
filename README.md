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

The architecture is structured in a way that the different stages of a GraphQL request are clearly separated:

![Design](/images/architecture.png)

When a request with a GraphQL query comes in, the following happens:

1. The GraphQL schema is the definition for the API and so the request gets validated against that definition (e.g. if the query is defined, if the requested fields and parameters exist etc).
2. Then the resolvers, which receive the query details as function parameters, are executed.
3. The resolvers now make whatever backend calls they need to make to get the data the query was asking for. In our case the resolvers simply call provider functions and return the provider's responses back to the client who sent the query.
4. We choose to use "providers" as abstractions over our backend resources, so the resolvers don't need to know if the data comes from a database or a third-party API, for example. This allows us to replace those data sources later on, if we need to, without having to mess with the resolvers. It also keeps our resolver logic clear and easy to understand.

### Folder structure

You are free to organise your code in whatever way you like, but the structure we chose here makes a lot of sense for what we need.

- All our actual code is under a single `src` folder (apart from project config files)
- Within `src` we have a `schema` and a `providers` folder, clearly separating these responsibilities.
- Currently our resolvers are part of our schema files to keep all that together. However, if resolvers become more complex, you might want to consider extractiung them into their own folder as well.
- You can see that, both under the `providers` and the `schema` folder, we distinguish between the two different data domains we support: `books` and `poetry`. It's nice and clean, and allows you to easily find what you're looking for.
- When you use the Prisma CLI it automatically creates a prisma folder at the top level, to keep its own config, and since we are using SQLite here, the DB file is also in that folder by default.

There is also an `images` folder in this repo, which just holds the assets for this README.

### GraphQL

For the GraphQL Server, we use the most popular library around: [Apollo-Server](https://www.apollographql.com/docs/apollo-server/).

It gives us everything we need to handle GraphQL stuff:

- The actual web server. We could also use ith an [existing API server](https://www.apollographql.com/docs/apollo-server/integrations/middleware/), e.g. Express, Koa, Fastify etc., but for our simple use case here, it works pretty well on its own.
- It provides us with ways to assemble schema Type Definitions
- It also gives us a way to hook in our resolvers that will get the data and send query responses back to the client.
- As a convenience, it also gives us the `gql` string template to parse the GraphQL schema notations.

### SQL

It's a pretty traditional need to access a SQL database from our GraphQL server.
Lots of so-called [ORMs](https://www.sitepoint.com/javascript-typescript-orms/) exist to do this, most notable Sequelize and Knex.
But recently [Prisma](https://www.prisma.io/) has made waves and so we're using it for our example here.

Check the `src/providers/booksDB` folder for how we handle our SQL database using Prisma:

- In `dbClient.js` we initialize our Prisma client, which we will use to execute all our SQL requests.
- In `dbProvider.js`, we execute the actual queries against the DB, using the prisma client.
- We create a few records in our database when the server starts, via the `ensureSeedData()` function in `seed.js`, in case the database is empty. This way we have some data to query, no matter what.

![Prisma Model autocomplete](/images/PrismaAutocomplete.png)

## Running the server

1. Clone repo
2. `npm install`
3. `npm start` launches nodemon for easy development

NOTE: You can reset the SQLite DB anytime by running `npm run resetDB`.

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
  poem {
    content
    poet {
      name
    }
  }
}
```

![Query Results](/images/queryResults.png)

## TODO

- [x] Add a mutation
- [x] Add a second data source
- [x] Add a diagram of the architecture
- [x] Document code more comprehensively
- [x] Finish ReadMe
- [ ] Maybe add a few tests?
