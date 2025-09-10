const express = require ("express");
const {getProducts, registerProduct, getProductById, updateProduct, deleteProduct} = require("../controllers/productController");


const router = express.Router();


router.route("/").get(getProducts).post(registerProduct);
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;