import { BrandModel } from "../model/BrandModel.js";
import { cloudUpload } from "../utility/Cloudinary.js";
import { createSlug } from "../utility/CreateSlug.js";
import asyncHandler from "express-async-handler"


//================get all product
export const GetAllBrandProducts = asyncHandler(async(req, res) => {

    const brands = await BrandModel.find();
   if(brands.length>0){
    res.status(200).json(brands)
   };
 
}) 

//================create product
export const createBrandProducts = asyncHandler(async (req, res, next) => {

  const { name } = req.body;
  const barndCheck = await BrandModel.findOne({name})
  if(barndCheck){
    return res.status(400).json({message:"Brand Already exists"})
  }


 const logo = await cloudUpload(req)

  const data = await BrandModel.create({
    name,
    slug: createSlug(name),
   logo:logo.secure_url?logo.secure_url:null,
    status: false,
  });

  res.status(200).json({
    brand: data,
    message: "create Brand product",
  });

});
//================create product
export const getSingleBrandProducts = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
const data = await BrandModel.findById(id);
res.status(200).json({
  brand: data,
  message: "get Single Brand product",
});

})
//================create product
export const updateSingleBrandProducts = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const { name, photo ,logo} = req.body;
    const data = await BrandModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: createSlug(name), 
        logo
      },
      { new: true }
    );
    res.status(200).json({
      brand: data,
      message: "Update Single Brand product",
    });
  
})
//================delete product
export const deleteSingleBrandProducts =asyncHandler( async (req, res, next) => {

    const { id } = req.params;
    const data = await BrandModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      brand: data,
      message: "Delete Single Brand product",
    });
  
})
//================status update brand product
export const statusSingleBrandProducts =asyncHandler( async (req, res, next) => {

    const { id } = req.params;
    const { status } = req.body;
    const data = await BrandModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );
    res.status(200).json({
      brand: data,
      message: "Status Single Brand product",
    });
  
})
