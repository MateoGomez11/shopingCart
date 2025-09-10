const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a product name"]
    },
    description: {
        type: String,
        required: false
    },
    unitPrice: {
        type: Number,
        required: [true, "Please add the price of the product"],
        min : [0, "Price most be greater than 0"]
    },
    availableStock: {
        type: Number,
        required: [true, "Please add available stock of the product"],
        min : [0, "Price most be greater than 0"]
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    Timestamp: true
});

//Document Middleware
productSchema.pre("save", function (next) {
  this.isActive = this.availableStock > 0;
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.availableStock !== undefined) {
    update.isActive = update.availableStock > 0;
    this.setUpdate(update);
  }
  next();
});




module.exports = mongoose.model("Product", productSchema);