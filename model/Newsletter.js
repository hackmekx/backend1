const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const Newsletter = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: () => uuidv4(),
      index: { unique: true },
    },

    email: {
      type: String,
    },
  },
  { timestamps: true }
);

const NewsletterSchema = mongoose.model("Newsletter", Newsletter);
module.exports = NewsletterSchema;
