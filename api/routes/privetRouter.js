import express from "express";
import {
  createNewUser,
  getallUser,
  me,
  updatecreatedNewUser,
  userDeleteControl,
  userLogin,
  userLogout,
  userPasswordupdate,
  userRegister,
  userRegisterUpdate,
} from "../controllers/authcontroler.js";
import { tokenVerify } from "../middlewares/TokenVerify.js";

const privetRouter = express.Router();

privetRouter.route("/login").post(userLogin);
privetRouter.route("/me").get(tokenVerify, me);
privetRouter.route("/logout").get(userLogout);
privetRouter.route("/register").post(userRegister);
privetRouter.route("/createuser").post(createNewUser);
privetRouter.route("/createuser/:id").put(updatecreatedNewUser);
privetRouter.route("/register").get(getallUser);
privetRouter.route("/register/:id").put(userRegisterUpdate);
privetRouter.route("/:id").delete(userDeleteControl);
privetRouter.route("/passwrod/:id").patch(userPasswordupdate);
export default privetRouter;
