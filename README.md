# GQL2SQL API Service

> Under Development!!!

This node application, once completed, will serve as an API service in front of our main SQL database (mainly for Findur data).
It can be used by any other applications or processes to interact with the Findur database without having to write complex SQL queries over unknown Findur-specific tables.

## Installation / Development

**Prerequisites:**

* Install [Git](https://git-scm.com/)
* Install [Node.js](https://nodejs.org/en/)
* Install [Nodemon](http://nodemon.io/)
* Install [Babel](https://babeljs.io/docs/usage/cli/)

**Installation:**

1. Clone this repo
2. Install dependencies: `npm install`
3. Run the service: `npm start`

Feel free to submit pull requests for enhancements. There is lots to do!

## Schema / Models

Currently only one model has been implemented: Hedge Accounting Forecasts.
However, other models can easily be added to expose more data points from the Findur DB.


![screenshot](./Assets/images/graphiql_screenshot.png)

## GraphQL and Sequelize

GraphQL is used as an efficient *abstraction layer* to read from or write to the MSSQL database, based on pre-defined data *schemas*. Unlike with REST APIs, with GraphQL you retrieve only what you query for, parameterized and fast.
The response is always valid JSON, which makes working with the returned data very easy in most languages.

Behind the scenes, the SQL endpoints are managed by the [**Sequelize** ORM](http://docs.sequelizejs.com/), in order to abstract away from manually constructed SQL statements. Sequelize takes care of security, data type validations and transaction management when accessing the SQL back-end.

Using GraphQL, the API Service is also secure from SQL Injection, as no direct SQL will be used by the clients making API calls.

## TODOs

| Backlog | In Progress | Done  |
| --------|---------|-------|
|         |         | Connect with MSSQL |
|         |         | Add GraphiQL IDE |
|         |         | Use Sequalize ORM |
|         |         | Central Config file |
|         |         | Forecasts Schema |
| Service Authentication |         |       |
| Automatic Model Config |         |       |
| Logging |         |       |
| Add Unit Testing | | |
|  | Documentation |       |
|  | | Process Runner/Cluster |
|  | Deployment Instructions  |       |
| Standard Transaction Schema |         |       |
| Tradeflows Schema |         |       |
| Rates Schema |         |       |
| ??? |         |       | |

...
