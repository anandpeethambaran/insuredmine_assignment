const mongoose = require('mongoose');
const { Schema } = mongoose

let modelName = "agent";

const schema = Schema({
  agentName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model(modelName, schema);