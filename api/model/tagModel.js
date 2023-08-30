import mongoose from "mongoose";

//======================cretagSchemate schema
const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
   trash:{
    type:Boolean,
    default:false
   },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//========================product model
export const tagModel = mongoose.model("Tag", tagSchema);
