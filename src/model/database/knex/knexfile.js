const environment = {
  development: {
    client: "postgresql",
    connection: {
      database: "challenge",
      user: "postgres",
      password: "postgres",
    },
    migrations: {
      directory: "./migrations",
      loadExtensions: [".js"],
    },
    seeds: {
      directory: "./seeds",
      loadExtensions: [".js"],
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "db",
      database: "challenge",
      user: "postgres",
      password: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      loadExtensions: [".js"],
    },
    seeds: {
      directory: "./seeds",
      loadExtensions: [".js"],
    },
  },
};

module.exports = environment[process.env.NODE_ENV || "development"];
