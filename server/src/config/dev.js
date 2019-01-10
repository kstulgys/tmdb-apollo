require("dotenv").config();

export const config = {
  port: 4000,
  jwt: "helloworld",
  jwtExp: "100d",
  dbUrl:
    "mongodb://tmdb:tmdb123@tmdb-server-dev-shard-00-00-uyxf0.mongodb.net:27017,tmdb-server-dev-shard-00-01-uyxf0.mongodb.net:27017,tmdb-server-dev-shard-00-02-uyxf0.mongodb.net:27017/test?ssl=true&replicaSet=tmdb-server-dev-shard-0&authSource=admin&retryWrites=true"
};
