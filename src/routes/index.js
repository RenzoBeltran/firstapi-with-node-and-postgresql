const {
 Router
} = require("express");
const router = Router();

const {
 getUsers,
 createUser,
 getUserById,
 deleteUser,
 updateUser
} = require("../controllers/index.controller");

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

module.exports = router;