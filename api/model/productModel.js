import mongoose from "mongoose";

//======================create schema
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      
    },
    slug: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
      default: null,
    },
    gallery: {
      type: Array,
      trim: true,
    },
    stock: {
      type: Number,
    },
    raguler_price: {
      type: String,
      trim: true,
    },
    sale_price: {
      type: String,
      trim: true,
    },
    long_dis: {
      type: String,
      trim: true,
    },
    short_dis: {
      type: String,
      trim: true,
    },
    catagory: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Catagory",
    },
    brand: {
      type: String,
    },
    tag: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    status: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//========================product model
export const ProductModel = mongoose.model("Product", productSchema);
