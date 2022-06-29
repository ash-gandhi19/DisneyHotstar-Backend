var mongodb = require("mongodb");
const dotenv = require('dotenv');
require('dotenv').config();
var MongoClient = mongodb.MongoClient;
var dbName =process.env.MONGO_DB;

var dburl = process.env.MONGO_URL
module.exports = { mongodb, MongoClient, dburl };
