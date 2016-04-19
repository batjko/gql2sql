const config = {
  "sqldb": {
    "server": "localhost",
    "port": 9000,
    "database": "FINDUR_PM",
    "username": "meteor_user",
    "password": "meteor"
  },
  "winston": {
    token: "f12243fb-a035-4a23-8287-d55bc7bef7d0",
    subdomain: "tuitreasury",
    tags: ["GQL2SQL", "API"],
    handleExceptions: true,
    json:true
  }
}

export default config;
