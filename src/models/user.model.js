const mongoose = require('mongoose');
const { Schema } = mongoose;

let modelName = "users";

const schema = Schema({
  firstName: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  zip: { type: String },
  gender: { type: String },
  dob: { type: String },
  userType: { type: String },
}, { timestamps: true });

module.exports = mongoose.model(modelName, schema);