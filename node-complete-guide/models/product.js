const getDb = require("../util/database").getDb;

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
}

module.exports = Product;
