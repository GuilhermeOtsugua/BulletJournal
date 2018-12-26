import Hapi from "hapi";
import knex from "./config/knex";


import { root, tasks, users } from "./routes";

const server = new Hapi.Server({
  port: process.env.PORT || 8000
});

const init = async () => {
  server.route([root, notas]);

  // server.start();
  await server.start();
  console.log("Server is running");
};

init();
