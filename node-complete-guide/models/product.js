const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

// const getDb = require("../util/database").getDb;
// const mongodb = require("mongodb");

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((e) => {
//         console.log(e);
//         throw e;
//       });
//   }

//   static fetchAll() {
//     const db = getDb();

//     return db
//       .collection("products")
//       .find()
//       .toArray() //till one hundred results, instead its better use pagination
//       .then((products) => {
//         return products;
//       })
//       .catch((e) => {
//         console.log(e);
//         throw e;
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next() //get the next and also the last document returned
//       .then((product) => {
//         return product;
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   static deleteById(prodId, userId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongodb.ObjectId(userId) },
//             {
//               $pull: {
//                 "cart.items": { productId: new mongodb.ObjectId(prodId) },
//               },
//             }
//           );
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }
// }

// module.exports = Product;
