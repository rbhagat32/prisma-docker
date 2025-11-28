import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "@/controllers/user.js";
import express from "express";

const router = express.Router();

router.get("/all", getAllUsers);
router
  .get("/:id", getUserById)
  .post("/create", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

export { router as UserRouter };
