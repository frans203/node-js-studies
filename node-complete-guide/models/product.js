const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection("products")
      .find()
      .toArray() //till one hundred results, instead its better use pagination
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next() //get the next and also the last document returned
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = Product;
