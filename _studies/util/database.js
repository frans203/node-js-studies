const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://admin:1234@cluster0.hkjnjx2.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((result) => {
      console.log("connected");
      _db = result.db();
      callback(result);
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
