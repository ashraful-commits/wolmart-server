import express from "express";

import { tokenVerify } from "../middlewares/TokenVerify.js";
import { Createrole, Deleterole, Updaterole, getallrole, singlerole, statusRoleUpdate } from "../controllers/RoleController.js";

const RoleRouter = express.Router();
RoleRouter.use(tokenVerify)
RoleRouter.route("/").get(getallrole).post(Createrole)
RoleRouter.route("/:id").get(singlerole).delete(Deleterole).put(Updaterole).patch(statusRoleUpdate)
export default RoleRouter;
