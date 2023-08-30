import mongoose from "mongoose";

//======================create schema
const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique:true
    },
    slug: {
      type: String,
      trim: true,
      unique:true
    },
    logo: {
      type: String,
      
    },
    status: {
      type: Boolean,
      default: false,
    },
   
    trash:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

//========================product model
export const BrandModel = mongoose.model("Brand", BrandSchema);
