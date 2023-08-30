import { ProductModel } from "../model/productModel.js";
import { createSlug } from "../utility/CreateSlug.js";
const options = { strictPopulate: false };
//================get all product
export const GetAllProducts = async (req, res, next) => {
  try {
    const data = await ProductModel.find().populate("catagory").populate("tag");

    res.status(200).json({
      product: data,
      message: "get All product",
    });
  } catch (error) {
    next(error);
  }
};

//================create product
export const createProducts = async (req, res, next) => {
  try {
    const galleryPhoto = [];
    const Files = req.files["gallery"].forEach((element) => {
      galleryPhoto.push(element.filename);
    });

    const {
      name,
      sale_price,
      raguler_price,
      short_dis,
      long_dis,
      stock,
      catagory,
      tag,
      brand,
    } = req.body;
    const cat = catagory.split(",");
    const Tag = tag.split(",");

    const data = await ProductModel.create({
      name,
      sale_price,
      raguler_price,
      short_dis,
      long_dis,
      stock,
      catagory: cat,
      tag: Tag,
      brand,
      gallery: galleryPhoto,
      photo: req.files["photo"][0].filename,
    });
    res.status(200).json({
      product: data,
      message: "create product",
    });
  } catch (error) {
    next(error);
  }
};
//================create product
export const getSingleProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ProductModel.findById({ _id: id });
    res.status(200).json({
      product: data,
      message: "get Single product",
    });
  } catch (error) {
    next(error);
  }
};
//================create product
export const updateSingleProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, sale_price, raguler_price, short_dis, long_dis, stock } =
      req.body;
    const data = await ProductModel.findByIdAndUpdate(id, {
      name,
      sale_price,
      raguler_price,
      short_dis,
      long_dis,
      stock,
    });
    res.status(200).json({
      product: data,
      message: "Update Single product",
    });
  } catch (error) {
    next(error);
  }
};
//================delete product
export const deleteSingleProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ProductModel.findByIdAndDelete(id);
    res.status(200).json({
      product: data,
      message: "Delete Single product",
    });
  } catch (error) {
    next(error);
  }
};
//================status update  product
export const statusUpdateSingleProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await ProductModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    res.status(200).json({
      product: data,
      message: "Status Single product",
    });
  } catch (error) {
    next(error);
  }
};
