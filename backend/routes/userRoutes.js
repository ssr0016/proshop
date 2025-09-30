import express from "express";
const router = express.Router();
import {
  getUserById,
  getUsers,
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

export default router;
