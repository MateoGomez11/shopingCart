const Product = require("../models/productModel");
const asyncHandler = require('express-async-handler');

//@desc Get all users
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
});

//@desc Register a product
//@route POST /api/products
//@access public
const registerProduct = asyncHandler(async (req, res) => {
    let { name, description, unitPrice, availableStock, isActive } = req.body;

    if (unitPrice <= 0) {
        res.status(400);
        throw new Error("Unit price must be greater than 0");
    }

    if (availableStock < 0) {
        res.status(400);
        throw new Error("Available stock must be greater than 0");
    }

    unitPrice = Number(unitPrice);
    availableStock = Number(availableStock);

    if (name == null || unitPrice == null || availableStock == null) {
        res.status(400);
        throw new Error("Name, Unit price and avaliable stock are mandatory");
    };


    const product = await Product.create({
        name,
        description,
        unitPrice,
        availableStock,
        isActive
    });

    console.log(`Product created ${product}`);

    if (product) {
        return res.status(201).json({
            id: product.id, name: product.name, description: product.description, unitPrice: product.unitPrice,
            availableStock: product.availableStock, isActive: product.isActive
        });
    } else {
        res.status(400);
        throw new Error("Product data is not valid");
    }
});

//@desc Get product by ID
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json(user);
});

//@desc Update product by ID
//@route UPDATE /api/products/:id
//@access public
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
            context: "query"
        },
    );

    res.status(200).json(updatedProduct);
});

//@desc Delete product by ID
//@route DELETE /api/products/:id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json(product);
})

module.exports = { getProducts, registerProduct, getProductById, updateProduct, deleteProduct };

