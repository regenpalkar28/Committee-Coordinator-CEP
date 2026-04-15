const mongoose = require('mongoose');
const fundSchema = new mongoose.Schema(
  {
    committee: {
      type: String,
      required: true,
      unique: true,
    },
    totalFunds: {
      type: Number,
      required: true,
      default: 0,
    },
    totalExpenses: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
fundSchema.statics.findOrCreate = async function (committee) {
  let fund = await this.findOne({ committee });
  if (!fund) {
    fund = await this.create({ committee });
  }
  return fund;
};
module.exports = mongoose.model('Fund', fundSchema);
