const mongoose = require("mongoose");
const userModelSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },

  dob: {
    type: String,
    required: true,
  },

  cnic: {
    type: String,
    required: true,
  },

  hobby: {
    type: String,
    required: true,
  },

  profession: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  created: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userModelSchema);
