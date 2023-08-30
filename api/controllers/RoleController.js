//================ role login
import asyencHandeler from "express-async-handler";


import { createSlug } from "../utility/CreateSlug.js";
import RoleModel from "../model/RoleModel.js";

export const getallrole = asyencHandeler(async (req, res) => {
    const role = await RoleModel.find();
  
    if (role.length<=0) {
      return  res.status(200).json({ message: "role not found" });
      }
      return  res.status(200).json({ message: "all role found", role: role });
    
  });
export const singlerole = asyencHandeler(async (req, res) => {
    const {id} = req.params
    const role = await RoleModel.findById(id);
  
    if (!role) {
    return    res.status(200).json({ message: "Single role not found" });
      } else {
     return   res.status(200).json({ message: " role found", role: role });
    }
  });
export const Deleterole = asyencHandeler(async (req, res) => {
    const {id} = req.params
    const role = await RoleModel.findByIdAndDelete(id);
  
    if (!role) {
      return  res.status(200).json({ message: "role not deleted" });
      } else {
     return   res.status(200).json({ message: " role Deleted", role});
    }
  });


export const Createrole = asyencHandeler(async (req, res) => {
  const { name,permissions } = req.body;
  if (!name || !permissions ) {
   return res.status(400).json({ message: "all fields are required !" });
  }
  const roleNameCheck = await RoleModel.findOne({ name });
  if (roleNameCheck) {
   return res.status(400).json({ message: "Name already exist!" });
  }
  const role = await RoleModel.create({
    name,
    slug:createSlug(name),
    permissions
  });

  if (role) {
  return  res.status(200).json({ message: "role created", role: role });
  } else {
  return  res.status(200).json({ message: "role not created",role: role });
  }
});
export const Updaterole = asyencHandeler(async (req, res) => {
  const { name,permissions } = req.body;
  const { id } = req.params;
  if (!name || !permissions ) {
   return res.status(400).json({ message: "All fields are required !" });
  }
  
  const role = await RoleModel.findByIdAndUpdate(id,{
    name,
    slug:createSlug(name),
    permissions:permissions
  },{new:true});

  if (role) {
  return  res.status(200).json({ message: "role Updated", role: role });
  } else {
  return  res.status(200).json({ message: "role not Updated",role: role });
  }
});
export const statusRoleUpdate = asyencHandeler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
 
  
  const role = await RoleModel.findByIdAndUpdate(id,{
    status:status
  },{new:true});

  if (role) {
   return res.status(200).json({ message: "status Updated", role: role });
  } else {
   return res.status(200).json({ message: "status not Updated", });
  }
});