require('dotenv').config ({ path : 'variables.env' });
const API_NAME    = "schedule";
const API_VERSION = "v1";
//
const CLUSTER_USER      = process.env.CLUSTER_USER;
const CLUSTER_PASSWORD  = process.env.CLUSTER_PASSWORD;
const CLUSTER_DATA_BASE = process.env.CLUSTER_DATA_BASE;
//
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  API_NAME,
  API_VERSION,
  CLUSTER_USER,
  CLUSTER_PASSWORD,
  CLUSTER_DATA_BASE,
  SECRET_KEY
};
