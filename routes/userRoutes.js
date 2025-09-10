const express = require ("express");
const {getUsers, registerUser, getUserById, updateUser, deleteUser} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getUsers).post(registerUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;