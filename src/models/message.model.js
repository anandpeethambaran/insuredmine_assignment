const mongoose = require('mongoose');
const { Schema } = mongoose

let modelName = "message";

const schema = Schema({
  message: { type: String },
  transferDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model(modelName, schema);