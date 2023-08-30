//================ user login
import asyencHandeler from "express-async-handler";
import UserModel from "../model/UserModel.js";
import { makeHash } from "../helper/MakeHash.js";
import bcrypt from "bcryptjs";
import { makeToken } from "../helper/MakeToken.js";
import comparePasswords from "../helper/Compare.js";
import { sendAMail } from "../helper/Email.js";

/**
* USER LOGIN
* POST
*/
export const userLogin = asyencHandeler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
   return res.status(404).json({ message: "All fields are required!" });
  }

  const LoginUser = await UserModel.findOne({ email }).populate("role");
  if (!LoginUser) {
   return res.status(404).json({ message: "User not found" });
  }
  const passCompare = bcrypt.compareSync(password, LoginUser.password);

  !passCompare && res.status(404).json({ message: "Password not matched!" });

  const Token = makeToken(
    {
      email: LoginUser.email,
      password: LoginUser.password,
    },
    process.env.JWT_SECRECT,
    "7d"
  );
  const RefToken = makeToken(
    {
      email: LoginUser.email,
      password: LoginUser.password,
    },
    process.env.REF_JWT_SECRECT,
    "30d"
  );
  res
    .cookie("accessToken", Token, {
      httponly: true,
      secure: process.env.APP_ENV === "development" ? false : true,
      sameSite:"strict",
      path:"/",
      maxage: 1000 * 60 * 60 * 24 * 7,
    })
    .status(200)
    .json({
      token: Token,
      refToken: RefToken,
      message: "Login successfull!",
      user: LoginUser,
    });
});
/**
 * LOGINED IN USER DATA 
 * GET 
 */
export const me = asyencHandeler(async (req, res) => {
  !req.me &&  res.status(401).json({ message: "login user data not found" });
 return res.status(200).json({ user: req.me ,message:"your are Login user!"});
});
/**
 * USER LOGOUT
 * DELETE
 */
export const userLogout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite:"strict",
    })
    .json({ message: "Logout success!" });
};
/**
 * GET USER ALL DATA
 * GET
 */
export const getallUser = asyencHandeler(async (req, res) => {
  const user = await UserModel.find().populate("role");

  if (user) {
   return res.status(200).json({ message: "all user found", user: user });
  } else {
   return res.status(200).json({ message: "User not found" });
  }
});
/**
 * USER DATA UPDATE
 * PUT
 */
export const userRegisterUpdate = asyencHandeler(async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  if (!name || !email ) {
   return res.status(400).json({ message: "All fields are required !" });
  }
  
  const user = await UserModel.findByIdAndUpdate(id,{
    name,
    email,
    
  },{new:true});

  if (user) {
   return res.status(200).json({ message: "User Updated", user: user });
  } else {
   return res.status(200).json({ message: "User not Updated" });
  }
});
/**
 * USER DATA delte
 * delete
 */
export const userAllDataUpdate = asyencHandeler(async (req, res) => {
  const { name, email,password } = req.body;
  const { id } = req.params;
  if (!name || !email||!password ) {
   return res.status(400).json({ message: "All fields are required !" });
  }
  
  const user = await UserModel.findByIdAndUpdate(id,{
    name,
    email,
    password
  },{new:true});

  if (user) {
   return res.status(200).json({ message: `${user.name} Updated`, user: user });
  } else {
   return res.status(200).json({ message: "User not Updated" });
  }
});
/**
 * USER DATA delte
 * delete
 */
export const userDeleteControl = asyencHandeler(async (req, res) => {
 
  const { id } = req.params;
  
  
  const user = await UserModel.findByIdAndDelete(id);

  if (user) {
   return res.status(200).json({ message: `${user.name} Deleted`, user: user });
  } else {
   return res.status(200).json({ message: "User not Deleted" });
  }
});
/**
 * USER PASSWORD UPDATE
 * PUT
 */
export const userPasswordupdate = asyencHandeler(async (req, res) => {
  const {old_password, password } = req.body;
  const { id } = req.params;

  if ( !old_password || !password ) {
   return res.status(400).json({ message: "Password fields required!" });
  }
  
  const UserPass = await UserModel.findById(id)
 const passCompare = await comparePasswords(old_password,UserPass.password)
 if(!passCompare){
 return res.status(200).json({ message: "Old Password not Match" });
 }
  const user = await UserModel.findByIdAndUpdate(id,{
   password:await makeHash(password)
    
  },{new:true});

  if (user) {
   return res.status(200).json({ message: "password Updated" });
  } else {
   return res.status(200).json({ message: "password not Updated" });
  }
});
/**
 * USER REGISTRATION
 * CREATE
 */
export const userRegister = asyencHandeler(async (req, res) => {
  const { name, email, password ,role} = req.body;
  if (!name || !email || !password) {
   return res.status(400).json({ message: "All fields are required !" });
  }
  const userEmailCheck = await UserModel.findOne({ email });
  if (userEmailCheck) {
   return res.status(400).json({ message: "Email already exists!" });
  }

  const user = await UserModel.create({
    name,
    email,
    password: await makeHash(password),
    role:role?role:"64c9ebfbddbc15d553aa4bc9"
  
  });


  if (user) {
   return res.status(200).json({ message: `${name} User created`, user: user });
  } else {
  return res.status(200).json({ message: "User not created" });
  }
});
export const createNewUser = asyencHandeler(async (req, res) => {
  const { name, email, password,role } = req.body;
  if (!name || !email || !password ||!role) {
   return res.status(400).json({ message: "All fields are required !" });
  }
  const userEmailCheck = await UserModel.findOne({ email });
  if (userEmailCheck) {
   return res.status(400).json({ message: "Email already exists!" });
  }

  const user = await UserModel.create({
    name,
    email,
    password: await makeHash(password),
    role
  
  }).populate("role");
  const data ={
    name:name,
    email:email,
    password:password
  }
sendAMail(
  email,
  data
)
  if (user) {
   return res.status(200).json({ message: `${name} User created`, user: user });
  } else {
  return res.status(200).json({ message: "User not created" });
  }
});
export const updatecreatedNewUser = asyencHandeler(async (req, res) => {
  const { name, email,role } = req.body;
  const {id } = req.params;
  if (!name || !email  ||!role) {
   return res.status(400).json({ message: "All fields are required !" });
  }
  const user = await UserModel.findByIdAndUpdate(id,{ name,email,role },{new:true});
  const data ={
    email,data:{
      name:name,
    }
  }

sendAMail(
  email,
  data
)
  if (user) {
   return res.status(200).json({ message: `${name} User Updated`, user: user });
  } else {
  return res.status(200).json({ message: "User not Updated" });
  }
});
