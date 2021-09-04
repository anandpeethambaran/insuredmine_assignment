const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;


let modelName = "userAccount";

const schema = Schema({
  userId: { type: ObjectId },
  accountName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model(modelName, schema);