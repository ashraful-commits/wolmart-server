import express from "express";
import {
  GetAllTagProducts,
  createTagProducts,
  deleteSingleTagProducts,
  getSinglTageProducts,
  updateSingleTagProducts,
  statusUpdateTagProducts,
} from "../controllers/TagController.js";

const TagRoute = express.Router();

TagRoute.get("/", GetAllTagProducts).post("/", createTagProducts);
TagRoute.get("/:id", getSinglTageProducts)
  .put("/:id", updateSingleTagProducts)
  .delete("/:id", deleteSingleTagProducts)
  .patch("/:id", statusUpdateTagProducts);
export default TagRoute;
