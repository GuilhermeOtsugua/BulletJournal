module.exports = {
  development: {
    migrations: { tableName: "knex_migrations" },
    seeds: { tableName: "./seeds" },

    client: "sqlite3",
    connection: {
      filename: "./mydb.sqlite",
      charset: "utf8"
    }
  },
  production: {
    migrations: { tableName: "knex_migrations" },
    seeds: { tableName: "./seeds" },

    client: "sqlite3",
    connection: {
      filename: "./mydb.sqlite",
      charset: "utf8"
    }
  }
};
