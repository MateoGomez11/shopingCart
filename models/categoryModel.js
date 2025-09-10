const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add a category name"],
        unique: [true, "Category already created"]
    },
    description: {
        type: String,
        required: false
    },
    active:{
        type: Boolean,
        default: true,
        required: false
    }
}, {
    Timestamp: true
})

module.exports = mongoose.model("category", categorySchema);