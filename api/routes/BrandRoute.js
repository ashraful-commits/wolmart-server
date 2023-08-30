import express from "express";
import {
  GetAllBrandProducts,
  createBrandProducts,
  deleteSingleBrandProducts,
  getSingleBrandProducts,
  statusSingleBrandProducts,
  updateSingleBrandProducts,
} from "../controllers/BrandController.js";
import { tokenVerify } from "../middlewares/TokenVerify.js";
import { brandLogo } from "../middlewares/multer.js";




const BrandRoute = express.Router();



BrandRoute.get("/", GetAllBrandProducts).post(
  "/",
  brandLogo,createBrandProducts
);
BrandRoute.get("/:id", getSingleBrandProducts)
  .put("/:id", updateSingleBrandProducts)
  .patch("/:id", statusSingleBrandProducts)
  .delete("/:id", deleteSingleBrandProducts);
export default BrandRoute;
