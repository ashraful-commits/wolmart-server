//================ permission login
import asyencHandeler from "express-async-handler";

import { makeHash } from "../helper/MakeHash.js";
import bcrypt from "bcryptjs";
import { makeToken } from "../helper/MakeToken.js";
import PermissionModel from "../model/PermissionModel.js";
import { createSlug } from "../utility/CreateSlug.js";

export const getallpermission = asyencHandeler(async (req, res) => {
    const permission = await PermissionModel.find();
  
    if (permission.length<=0) {
      return  res.status(200).json({ message: "permission not found" });
      } 
      return  res.status(200).json({ message: "all permission found", permission: permission });
    
  });
export const singlePermission = asyencHandeler(async (req, res) => {
    const {id} = req.params
    const permission = await PermissionModel.findById(id);
  
    if (!permission) {
     return   res.status(200).json({ message: "Single permission not found" });
      } else {
       return res.status(200).json({ message: " permission found", permission: permission });
    }
  });
export const DeletePermission = asyencHandeler(async (req, res) => {
    const {id} = req.params
    const permission = await PermissionModel.findByIdAndDelete(id);
  
    if (!permission) {
      return  res.status(200).json({ message: "Permission not deleted" ,permission});
      } else {
       return res.status(200).json({ message: " permission Deleted",permission });
    }
  });


export const Createpermission = asyencHandeler(async (req, res) => {
  const { name } = req.body;
  if (!name ) {
  return  res.status(400).json({ message: "Name field required !" });
  }
  const PermissionNameCheck = await PermissionModel.findOne({ name });
  if (PermissionNameCheck) {
  return  res.status(400).json({ message: "Name already exist!" });
  }else{
    const permission = await PermissionModel.create({
      name,
      slug:createSlug(name)
    });
  
    if (permission) {
    return  res.status(200).json({ message: "permission created", permission: permission });
    } else {
    return  res.status(200).json({ message: "permission not created" });
    }
  }
 
});
export const UpdatePermission = asyencHandeler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name ) {
   return res.status(400).json({ message: "Name field required !" });
  }
  
  const permission = await PermissionModel.findByIdAndUpdate(id,{
    name,
    slug:createSlug(name)
  });

  if (permission) {
   return res.status(200).json({ message: "permission Updated", permission: permission });
  } else {
   return res.status(200).json({ message: "permission not Updated" });
  }
});
export const statusPermissionUpdate = asyencHandeler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
 
  
  const permission = await PermissionModel.findByIdAndUpdate(id,{
    status:status
  },{new:true});

  if (permission) {
   return res.status(200).json({ message: "status Updated", permission: permission });
  } else {
   return res.status(200).json({ message: "status not Updated" });
  }
});
