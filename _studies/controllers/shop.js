const Product = require("../models/product");
const Order = require("../models/order");
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/products",
        hasProducts: products.length > 0,
        isAuthenticated: req.session.isLoggedIn,
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
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((e) => console.log(e));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((e) => console.log(e));
};

exports.getCart = (req, res, next) => {
  return req.user
    .populate("cart.items.productId", "title")
    .then((products) => {
      console.log(products.cart.items);

      res.render("shop/cart", {
        products: products.cart.items,
        pageTitle: "Your cart",
        path: "/cart",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((e) => console.log(e));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const cartProducts = user.cart.items.map((item) => {
        return { quantity: item.quantity, product: { ...item.productId } };
      });
      const order = new Order({
        user: { name: req.user.name, userId: req.user._id },
        products: cartProducts,
      });

      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      return res.redirect("/orders");
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.postCart = (req, res, next) => {
  const singleProductId = req.body.productId;

  Product.findById(singleProductId)
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
