const Product = require("../models/product");
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/products",
        hasProducts: products.length > 0,
      });
    })
    .catch((e) => console.log(e));
};

exports.getSingleProduct = (req, res, next) => {
  const singleProductId = req.params.productId;
  Product.findById(singleProductId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title,
        path: "/products",
        product: product,
      });
    })
    .catch((e) => console.log(e));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((e) => console.log(e));
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts().then((products) => {
//         res.render("shop/cart", {
//           products: products,
//           pageTitle: "Your Cart",
//           path: "/cart",
//         });
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       res.render("shop/orders", {
//         pageTitle: "Orders",
//         path: "/orders",
//         orders,
//       });
//     })
//     .catch((e) => console.log(e));
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .then((result) => {
//           return fetchedCart.setProducts(null);
//         })
//         .then((result) => {
//           res.redirect("/orders");
//         })
//         .catch((e) => console.log(e));
//     })
//     .catch((e) => console.log(e));
// };

// exports.postCart = (req, res, next) => {
//   const singleProductId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;

//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       console.log(cart);
//       return cart.getProducts({ where: { id: singleProductId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Product.findByPk(singleProductId);
//     })
//     .then((product) => {
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity },
//       });
//     })
//     .then(() => {
//       return res.redirect("/cart");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const singleProductId = req.body.productId;
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: singleProductId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       return product.cartItem.destroy();
//     })
//     .then((result) => {
//       res.redirect("/cart");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };
