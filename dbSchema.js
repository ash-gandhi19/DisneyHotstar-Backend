var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var dbName = "disneypulhotstart";

var dburl = `mongodb+srv://aishwaryagandhi:ManyaMau1921@cluster0.fwpds.mongodb.net/${dbName}`;
module.exports = { mongodb, MongoClient, dburl };
