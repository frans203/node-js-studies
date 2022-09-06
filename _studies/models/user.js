const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteItemFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    console.log("teste", item.productId);
    return item.productId.toString() !== productId.toString();
  });
  console.log("productId", productId);

  this.cart.items = updatedCartItems;
  return this.save().catch((e) => {
    console.log(e);
    throw e;
  });
};

module.exports = mongoose.model("User", userSchema);
