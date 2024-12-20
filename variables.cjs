const MONGO_CONN_URL =
    "mongodb://${MONGO_CONN_USERNAME}:${MONGO_CONN_PASS}@${MONGO_CONN_IP}:${MONGO_CONN_PORT}/${MONGO_CONN_DB}?${MONGO_CONN_AUTH}";

const MONGO_CONN_USERNAME = "***";
const MONGO_CONN_PASS = "***";
const MONGO_CONN_IP = "192.168.0.101";
const MONGO_CONN_PORT = "27017";
const MONGO_CONN_DB = "mydb";
const MONGO_CONN_AUTH = "authSource=admin";

const url = MONGO_CONN_URL;
module.exports = url;