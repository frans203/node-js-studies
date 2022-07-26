const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(singleProductId)
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
  Product.findAll()
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
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (const product of products) {
        const cartProductData = cart.products.find(
          (item) => item.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }

      res.render("shop/cart", {
        products: cartProducts,
        pageTitle: "Cart Products",
        path: "/cart",
      });
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/shop/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postCart = (req, res, next) => {
  const singleProductId = req.body.productId;
  Product.findById(singleProductId, (product) => {
    Cart.addProduct(singleProductId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const singleProductId = req.body.productId;
  Product.findById(singleProductId, (product) => {
    Cart.deleteProduct(singleProductId, product.price);
    res.redirect("/cart");
  });
};
