import express from "express";
import {
  GetAllProducts,
  createProducts,
  deleteSingleProducts,
  getSingleProducts,
  statusUpdateSingleProducts,
  updateSingleProducts,
} from "../controllers/productController.js";
import {
  galleryPhotoUpload,
  singlePhotoUpload,
} from "../middlewares/multer.js";

// create route

const productRoute = express.Router();

productRoute
  .get("/", GetAllProducts)
  .post("/", galleryPhotoUpload, createProducts);
productRoute
  .get("/:id", getSingleProducts)
  .put("/:id", singlePhotoUpload, updateSingleProducts)
  .patch("/:id", statusUpdateSingleProducts)
  .delete("/:id", deleteSingleProducts);
export default productRoute;
