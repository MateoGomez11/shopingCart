const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
    unitPrice: {
        type: Number,
        required: [true, "Unit price is required"],
        min: [0, "Unit price must be 0 or greater"],
    },
    subtotal: {
        type: Number, 
        required: true,
        min: [0, "Subtotal must be grater than 0"]
    }

},
    { _id: false }
);

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    items: {
        type: [cartItemSchema],
        default: [],
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
    
}, { timestamps: true });

cartSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model("Cart", cartSchema);