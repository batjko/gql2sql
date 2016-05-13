const config = {
  "port": 9000,
  "sqldb": {
    "dialect": "mssql",
    "server": "localhost",
    dialectOptions: {  // Not needed if you connect to the default instance
      instanceName: "SQLEXPRESS"
    },
    "database": "testDB",
    "username": "api_user",
    "password": "api_password"
  },
  "winston": { // and Loggly details
    token: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    subdomain: "myCompanyAccount",
    tags: ["GQL2SQL", "API"],
    handleExceptions: true,
    json: true
  }
}

export default config;
