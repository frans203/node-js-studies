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

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        products: products,
        pageTitle: "Your Cart",
        path: "/cart",
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders,
      });
    })
    .catch((e) => console.log(e));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(() => {
      res.redirect("/orders");
    })
    .catch((e) => console.log(e));
};

exports.postCart = (req, res, next) => {
  const singleProductId = req.body.productId;

  return Product.findById(singleProductId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const singleProductId = req.body.productId;
  req.user
    .deleteItemFromCart(singleProductId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((e) => {
      console.log(e);
    });
};
