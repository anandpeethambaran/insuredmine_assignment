const mongoose = require('mongoose');
const { Schema } = mongoose

let modelName = "lob";

const schema = Schema({
  categoryName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model(modelName, schema);