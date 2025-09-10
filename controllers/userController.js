const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')


//@desc Get all users
//@route GET /api/users
//@access public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

//@desc Register a user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, address, phone } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Name, Email and password are mandatory")
    };

    const user = await User.create({
        name,
        email,
        password,
        role,
        address,
        phone
    });

    console.log(`User created ${user}`);

    if (user) {
        return res.status(201).json({ id: user.id, name: user.name, email: user.email, password: user.password, role: user.role });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc Get user by ID
//@route GET /api/users/:id
//@access public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

//@desc Update a user
//@route PUT /api/user/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    };

    const UpdatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );

    res.status(200).json(UpdatedUser);
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    };

    await User.deleteOne( {_id: req.params.id} );
    res.status(200).json(user);
});



module.exports = { getUsers, registerUser, getUserById, updateUser, deleteUser }


