const Category = require("../models/categoryModel");
const asyncHandler = require('express-async-handler');

//@desc Get all categories
//@route GET /api/categories
//@access public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
});

//@desc Create category
//@route POST /api/categories
//@access public
const createCategory = asyncHandler(async (req, res) => {
    const { name, description, active } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("Name is mandatory")
    };
    const categoryName = await Category.findOne({ name: name });
    if (categoryName) {
        res.status(409);
        throw new Error("Name already registered")
    }

    const category = await Category.create({
        name,
        description,
        active
    });

    console.log(`Category created ${category}`);

    if (category) {
        return res.status(201).json({ id: category.id, name: category.name, description: category.description, active: category.active});
    } else {
        res.status(400);
        throw new Error("Category data is not valid");
    }
});

//@desc Get category by ID
//@route GET /api/categories/:id
//@access public
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }
    res.status(200).json(category);
});


//@desc Update a category
//@route PUT /api/categories/:id
//@access public
const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    };

    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );

    res.status(200).json(updatedCategory);
});

//@desc Delete product by ID
//@route DELETE /api/products/:id
//@access public
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json(category);
})

module.exports = {getCategories, createCategory, getCategoryById, updateCategory, deleteCategory}