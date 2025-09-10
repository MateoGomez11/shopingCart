const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please add your name"]
    },
    email: {
        type: String,
        required: [true, "Please add the user email"],
        unique: [true, "Email adress already registered"]
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    address:{
        type: String,
        required: false
    },
    phone:{
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
