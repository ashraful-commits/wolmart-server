import mongoose from "mongoose";

//======================create schema
const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    icon:{
      type:String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      trim: true,
      default: null,
    },
    parentCategory:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Category",
      default:null
    },
    subCategory:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"Category",
      default:null,
    },
    trash:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

//========================product model
export const CategoryModel = mongoose.model("Category", CategorySchema);
