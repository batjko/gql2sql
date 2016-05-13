const config = {
  "sqldb": {
    "server": "localhost\SQLEXPRESS",
    "port": 9000,
    "database": "testDB",
    "username": "api_user",
    "password": "api_password"
  },
  "winston": {
    token: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    subdomain: "myCompanyAccount",
    tags: ["GQL2SQL", "API"],
    handleExceptions: true,
    json:true
  }
}

export default config;
