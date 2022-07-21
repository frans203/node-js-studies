const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Analyze the cart => Find existing Product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        //add new product/increase quantity
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products]; //test delete it
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      } else {
        return;
      }
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (item) => item.id !== id
      );
      if (cart.totalPrice - productPrice * productQty < 0) {
        cart.totalPrice = 0;
      } else {
        cart.totalPrice = cart.totalPrice - productPrice * productQty;
      }
      cart.products = updatedCart.products;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
