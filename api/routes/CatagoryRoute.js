import express from "express";

import { singlePhotoUpload } from "../middlewares/multer.js";
import { GetAllCategoryProducts, createCategoryProducts, deleteSingleCategoryProducts, getSingleCategoryProducts, statusSingleCategoryProducts, updateSingleCategoryProducts } from "../controllers/CatagoryController.js";

const categoryRoute = express.Router();

categoryRoute
  .get("/", GetAllCategoryProducts)
  .post("/", singlePhotoUpload, createCategoryProducts);
categoryRoute
  .get("/:id", getSingleCategoryProducts)
  .put("/:id", singlePhotoUpload, updateSingleCategoryProducts)
  .delete("/:id", deleteSingleCategoryProducts)
  .patch("/:id", statusSingleCategoryProducts);
export default categoryRoute;
