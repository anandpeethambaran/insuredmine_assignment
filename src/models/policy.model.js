const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

let modelName = "policy";

const schema = Schema({
  userId: { type: ObjectId },
  category: { type: String },
  policyNo: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  collectionId: { type: String },
  companyCollectionId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model(modelName, schema);