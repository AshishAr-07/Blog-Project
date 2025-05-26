import express from "express";
import {
  deleteUser,
  getAlllUSers,
  loginuser,
  userRegister,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";

const router = express.Router();
// sign Up
router.post("/signup", userRegister);
//login
router.post("/login", loginuser);
//all Users
router.get("/users", requireSignIn, isAdmin, getAlllUSers);
// delete User
router.delete("/deleteuser/:id", requireSignIn, isAdmin, deleteUser);

router.get("/dashboard", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

router.get("/dashboard/create-roles", requireSignIn, isAdmin , (req,res)=>{
  res.status(200).send({
    ok: true,
  });
})
export default router;
