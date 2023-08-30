

import { CategoryModel } from "../model/CatagoryModel.js";
import { createSlug } from "../utility/CreateSlug.js";
import asyncHandler from "express-async-handler"
//================get all product
export const GetAllCategoryProducts =asyncHandler( async (req, res, next) => {
  
    const data = await CategoryModel.find().populate([
      {
        path:"subCategory",
        populate:{
          path:"subCategory",
          populate:{
            path:"subCategory",
          }
        
      }},{path:"parentCategory", 
      path:"parentCategory",
      populate:{
        path:"parentCategory",
        populate:{
          path:"parentCategory",
          populate:{
            path:"parentCategory",
            
          }
        }
      
    }}

    ])
    res.status(200).json({
      category: data,
      message: "get All product",
    });
  
})

//================create product
export const createCategoryProducts = asyncHandler(async (req, res, next) => {

    const { name,parentCategory } = req.body;
    const data = await CategoryModel.create({
      name,
      slug: createSlug(name),
      photo: req.file.filename,
      parentCategory
    
    });
if(parentCategory){
  const parent = await CategoryModel.findByIdAndUpdate(parentCategory,{$push:{subCategory:data._id}})
}
    res.status(200).json({
      category: data,
      message: "create product",
    });
  
})
//================create product
export const getSingleCategoryProducts = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const data = await CategoryModel.findById({ _id: id }).populate([
      {
        path:"subCategory",
        populate:{
          path:"subCategory",
          populate:{
            path:"subCategory",
          }
        
      }},{path:"parentCategory", 
      path:"parentCategory",
      populate:{
        path:"parentCategory",
        populate:{
          path:"parentCategory",
          populate:{
            path:"parentCategory",
            
          }
        }
      
    }}

    ]);
    res.status(200).json({
      category: data,
      message: "get Single category product",
    });
  
})
//================create product
export const updateSingleCategoryProducts = (async (req, res, next) => {

    const { id } = req.params;
    const { name, photo ,parentCategory,
      subCategory} = req.body;
    const data = await CategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: createSlug(name),
        photo: req.file?.filename ? req.file.filename : photo,parentCategory,
        subCategory
      },
      { new: true }
    );
    res.status(200).json({
      category: data,
      message: "Update Single category product",
    });
  
});
//================delete product
export const deleteSingleCategoryProducts = asyncHandler(async (req, res, next) => {
  
    const { id } = req.params;
    const data = await CategoryModel.findByIdAndDelete(id);
    res.status(200).json({
      category: data,
      message: "Delete Single category product",
    });
  
});

//================status update category product
export const statusSingleCategoryProducts = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const data = await CategoryModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    res.status(200).json({
      category: data,
      message: "Status Single category product",
    });
  
});
