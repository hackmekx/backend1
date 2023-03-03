const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const CategorySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: () => uuidv4(),
      index: { unique: true },
    },

    title: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
