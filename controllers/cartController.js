const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Product = require("../models/productModel")
const asyncHandler = require('express-async-handler');


//@desc Create cart
//@route POST /api/cart
//@access public
const createCart = asyncHandler(async (req, res) => {
    const { user, items: cartItems = []} = req.body;

    if (!user) {
        res.status(400);
        throw new Error("User must be logged in");
    };
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        res.status(400);
        throw new Error("1 Product minimum required");
    }
    const cartExists = await Cart.findOne({user: req.params.id});
    if (cartExists) {
        res.status(409);
        throw new Error("User already has a cart")
    }


    const items = await Promise.all(
        cartItems.map(async (it, idx) => {
            const productId = it.product;
            const quantity =  Number(it.quantity);

            if (!productId) {
                res.status(400);
                throw new Error("Valid product id is required");
            };

            if (Number.isNaN(quantity) || quantity < 1) {
                res.status(400);
                throw new Error("Quantity minimum is 1");
            };

            const productDoc = await Product.findById(productId);
            if (!productDoc) {
                res.status(404)
                throw new Error(`Item ${idx}: Product with id: ${productId} does not exist`);
            }

            const unitPrice = productDoc.unitPrice; 
            const subtotal = unitPrice * quantity;

            return {
                product: productId,
                unitPrice,
                quantity,
                subtotal
            };
        })
    );


    const cart = await Cart.create({
        user,
        items,
    });

     if (cart) {
        return res.status(201).json({ id: cart.id, user: cart.user, items: cart.items, status: cart.status});
    } else {
        res.status(400);
        throw new Error("Cart data is not valid");
    }

});

//@desc Get cart by User
//@route GET /api/cart/:id
//@access public
const getCartByUser = asyncHandler(async(req,res) => {
const cart = await Cart.find({user: req.params.id});
    if (!cart || cart.length === 0) {
        res.status(404);
        throw new Error("Cart not found");
    }
    res.status(200).json(cart);
});

//@desc Update a cart
//@route PUT /api/cart/:id
//@access public
const updateCart = asyncHandler(async(req,res) => {
    const cart = await Cart.find({user: req.params.id});
    if (!cart || cart.length === 0) {
        res.status(404);
        throw new Error("Cart not found");
    }

    const updatedCart = await Cart.findOneAndUpdate(
            {user: req.params.id},
            req.body,
            { new: true },
        );
    
        res.status(200).json(updatedCart);
})

module.exports = {createCart, getCartByUser, updateCart};