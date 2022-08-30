const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = new mongodb.ObjectId(userId);
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  static findById(productId) {
    const db = getDb();

    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(productId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  static deleteById(productId) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(productId) })
      .then(() => {
        console.log("deleted product");
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = Product;
