const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insert(this)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((item) => {
      return item.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        quantity: newQuantity,
        productId: new mongodb.ObjectId(product._id),
      });
    }
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: [...updatedCartItems] } } }
      )
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }
}

module.exports = User;
