// const getDb = require("../util/database").getDb;
// const mongodb = require("mongodb");

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = new mongodb.ObjectId(id);
//   }

//   save() {
//     const db = getDb();
//     return db
//       .collection("users")
//       .insert(this)
//       .then((result) => {
//         return result;
//       })
//       .catch((e) => {
//         console.log(e);
//         throw e;
//       });
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((item) => {
//       return item.productId.toString() === product._id.toString();
//     });

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         quantity: newQuantity,
//         productId: new mongodb.ObjectId(product._id),
//         title: product.title,
//       });
//     }
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: [...updatedCartItems] } } }
//       )
//       .then((result) => {
//         return result;
//       })
//       .catch((e) => {
//         console.log(e);
//         throw e;
//       });
//   }

//   getCart() {
//     const db = getDb();

//     const productIds = this.cart.items.map((item) => {
//       return item.productId;
//     });

//     return db
//       .collection("products")
//       .find({ _id: { $in: [...productIds] } })
//       .toArray()
//       .then((products) => {
//         return products.map((product) => {
//           return {
//             ...product,
//             quantity: this.cart.items.find((item) => {
//               return item.productId.toString() === product._id.toString();
//             }).quantity,
//           };
//         });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       )
//       .then((result) => {
//         console.log(result);
//         return result;
//       });
//   }

//   static findById(userId) {
//     const db = getDb();

//     return db
//       .collection("users")
//       .findOne({ _id: new mongodb.ObjectId(userId) })
//       .then((result) => {
//         return result;
//       })
//       .catch((e) => {
//         console.log(e);
//         throw e;
//       });
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: [...products],
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name,
//           },
//         };

//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//       .then((result) => {
//         return result;
//       })
//       .catch((e) => {
//         console.log(e);
//         throw e;
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection("orders")
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray()
//       .then((orders) => {
//         return orders;
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }
// }

// module.exports = User;
