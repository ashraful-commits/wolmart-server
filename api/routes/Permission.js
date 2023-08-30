import express from "express";

import { tokenVerify } from "../middlewares/TokenVerify.js";
import { Createpermission, DeletePermission, UpdatePermission, getallpermission, singlePermission, statusPermissionUpdate } from "../controllers/PermissionContoller.js";


const permissionRouter = express.Router();
permissionRouter.use(tokenVerify)
permissionRouter.route("/").get(getallpermission).post(Createpermission)
permissionRouter.route("/:id").get(singlePermission).delete(DeletePermission).put(UpdatePermission).patch(statusPermissionUpdate)
export default permissionRouter;
