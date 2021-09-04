const mongoose = require('mongoose');
const { Schema } = mongoose

let modelName = "carrier";

const schema = Schema({
  companyName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model(modelName, schema);