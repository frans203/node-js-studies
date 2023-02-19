const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");
router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getSingleProduct);
router.get("/cart", isAuth, isAuth, shopController.getCart);
router.get("/orders", isAuth, shopController.getOrders);
router.get("/checkout", isAuth, shopController.getCheckout);

router.post("/cart", isAuth, shopController.postCart);
router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);
router.post("/create-order", isAuth, shopController.postOrder);

module.exports = router;
