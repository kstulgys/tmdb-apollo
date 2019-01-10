require("dotenv").config();
import { merge } from "lodash";
const env = process.env.NODE_ENV || "development";
/// base
const baseConfig = {
  env,
  isDev: env === "development",
  isProd: env === "production",
  isTest: env === "testing"
};

let envConfig = {};

switch (env) {
  case "dev":
  case "development":
    envConfig = require("./dev").config;
    break;
  case "prod":
  case "production":
    envConfig = require("./prod").config;
    break;
}

export default merge(baseConfig, envConfig);
