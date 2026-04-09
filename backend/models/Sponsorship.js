const mongoose = require('mongoose');

const sponsorshipSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    committee: { type: String, required: true },
    
    // --- YOUR NEW FIELDS ---
    companyName: { type: String, required: true },
    companyOrigin: { type: String, required: true },
    description: { type: String, required: true },
    documentLink: { type: String, required: true },
    amountPledged: { type: Number, required: true },
    // -----------------------

    contactPerson: { type: String },
    contactEmail: { type: String },  
    
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sponsorship', sponsorshipSchema);