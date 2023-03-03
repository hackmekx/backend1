const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const ProductSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: () => uuidv4(),
      index: { unique: true },
    },

    name: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;
