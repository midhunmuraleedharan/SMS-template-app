import mongoose from "mongoose";

const template = new mongoose.Schema({
  template_name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  template_body: {
    type: String,
    required: true,
    trim: true,
  },
});
   
export const templateSchema = mongoose.model("template", template);
