const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema(
  {
    committee: {
      type: String,
      required: true,
      unique: true, // Only one "fund" document per committee
    },
    totalFunds: {
      type: Number,
      required: true,
      default: 0, // Starts at 0
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

// This function will automatically create a Fund document
// for a committee if one doesn't exist.
fundSchema.statics.findOrCreate = async function (committee) {
  let fund = await this.findOne({ committee });
  if (!fund) {
    fund = await this.create({ committee });
  }
  return fund;
};

module.exports = mongoose.model('Fund', fundSchema);