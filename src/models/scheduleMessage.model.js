const mongoose = require('mongoose');
const { Schema } = mongoose

let modelName = "schedule-message";

const schema = Schema({
  message: { type: String },
  date: { type: String }
}, { timestamps: true });

module.exports = mongoose.model(modelName, schema);