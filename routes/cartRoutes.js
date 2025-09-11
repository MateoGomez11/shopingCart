const express = require ("express");
const {createCart, getCartByUser, updateCart} = require("../controllers/cartController");

const router = express.Router();

router.route("/").post(createCart);
router.route("/:id").get(getCartByUser).put(updateCart);

module.exports = router;