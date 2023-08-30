import { tagModel } from "../model/tagModel.js";
import { createSlug } from "../utility/CreateSlug.js";
import asyncHandler from "express-async-handler"
//================get all product
export const GetAllTagProducts = asyncHandler(async (req, res, ) => {
  
    const data = await tagModel.find();
    res.status(200).json({
      tag: data,
      message: "get All tag product",
    });
  
})

//================create product
export const createTagProducts = asyncHandler(async (req, res) => {

    const { name } = req.body;
    const data = await tagModel.create({
      name,
      slug: createSlug(name),
    });
    res.status(200).json({
      tag: data,
      message: "create tag product",
    });
  
})
//==============================================================single tag  product
export const getSinglTageProducts = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const data = await tagModel.findById({ _id: id });
    res.status(200).json({
      tag: data,
      message: "get Single tag product",
    });
  }
  )
//======================================================update single tag product
export const updateSingleTagProducts =asyncHandler( async (req, res, next) => {

    const { id } = req.params;
    const { name } = req.body;
    console.log(name);
    console.log(id);
    const data = await tagModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: createSlug(name),
      },
      { new: true }
    );
    res.status(200).json({
      tag: data,
      message: "Update Single tag product",
    });
  } 
  )
//================delete product
export const deleteSingleTagProducts =asyncHandler( async (req, res, next) => {
  
    const { id } = req.params;
    const data = await tagModel.findByIdAndDelete(id);
    res.status(200).json({
      tag: data,
      message: "Delete Single tag product",
    });
  } )

export const statusUpdateTagProducts = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const { status } = req.body;
    const data = await tagModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    res.status(200).json({
      tag: data,
      message: "Status Single tag product",
    });
  } )
