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
      const existingProductIndex = cart.products.findIndex(
        (item) => item.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1, price: Number(productPrice) };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);
      console.log(cart);
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice };
      if (!err) {
        cart = JSON.parse(fileContent);
      } else {
        return;
      }
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((item) => item.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (item) => item.id !== id
      );
      if (updatedCart.totalPrice - productQty * productPrice < 0) {
        updatedCart.totalPrice = 0;
      } else {
        updatedCart.totalPrice =
          updatedCart.totalPrice - productQty * productPrice;
      }

      cart.products = updatedCart.products;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
