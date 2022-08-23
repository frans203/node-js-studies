const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   const editModeBool = editMode === "true";
//   if (!editModeBool) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   Product.findByPk(prodId)
//     .then((product) => {
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editModeBool,
//         product: product,
//       });
//     })
//     .catch((e) => console.log(e));
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedDescription = req.body.description;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;

//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.description = updatedDescription;
//       product.imageUrl = updatedImageUrl;
//       product.price = updatedPrice;
//       return product.save();
//     })
//     .then(() => {
//       console.log("UPDATED PRODUCT");
//       res.redirect("/admin/products");
//     })
//     .catch((e) => console.log(e));
// };

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const newProduct = new Product(title, price, description, imageUrl);

  newProduct
    .save()
    .then((result) => {
      console.log("CREATED PRODUCT");
      res.redirect("/");
    })
    .catch((e) => console.log(e));
};

// exports.postDeleteProduct = (req, res, next) => {
//   const productId = req.body.productId;
//   Product.findByPk(productId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then(() => {
//       console.log("product destroyed");
//       res.redirect("/admin/products");
//     })
//     .catch((e) => console.log(e));
// };

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((e) => console.log(e));
};
