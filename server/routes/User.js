const express = require("express");
const router = express.Router();

const {
  addUser,
  addRelation,
  getUser,
  getDegrees,
  getUsers,
} = require("../controllers/User");

router.post("/user/add", addUser);
router.post("/relation/:id1/:id2", addRelation);

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.get("/relation/:id1/:id2", getDegrees);
module.exports = router;
