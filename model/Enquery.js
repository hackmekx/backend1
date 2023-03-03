const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const Enquery = new Schema(
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

    email: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    enquery: {
      type: String,
    },
  },
  { timestamps: true }
);

const EnquerySchema = mongoose.model("Enquery", Enquery);
module.exports = EnquerySchema;
