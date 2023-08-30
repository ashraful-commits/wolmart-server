import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";

import productRoute from "./api//routes/ProductRoute.js";
import { errorHendler } from "./api/middlewares/errorHendler.js";
import BrandRoute from "./api/routes/BrandRoute.js";

import TagRoute from "./api/routes/TagRoute.js";
import privetRouter from "./api/routes/privetRouter.js";
import cookiesParser from "cookie-parser"
import permissionRouter from "./api/routes/Permission.js";
import RoleRouter from "./api/routes/Role.js";
import categoryRoute from "./api/routes/CatagoryRoute.js";
import { MongoDBCnncetion } from "./api/config/mongoDBConncetion.js";
//===============================================> dotenv config
dotenv.config();
//===============================================> evn
const port = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "https://wolmart-dashboard.vercel.app",
    credentials: true,
  })
);
app.use(cookiesParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("api/public"));

//================================================> routes
app.use("/api/v1/auth", privetRouter);
app.use("/api/v1/permission", permissionRouter);
app.use("/api/v1/role", RoleRouter);
app.use("/api/v1/brand", BrandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/tags", TagRoute);
app.use("/api/v1/product", productRoute);
app.use(errorHendler);
//================================================> create server
app.listen(port, () => {
  MongoDBCnncetion();
  console.log(`Server running on port ${port}`.bgCyan.yellow);
});
