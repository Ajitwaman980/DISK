const mongoose = require("mongoose");

const spaceBuyerSchema = new mongoose.Schema({
  buyerId: {
    type: String,
    required: true,
  },
  rentedSpace: {
    type: Number, // Rented space in GB
    required: true,
  },
  providerId: {
    type: String, // Provider ID from whom the space is rented
    required: true,
  },
  ipfsHashes: {
    type: [String], // Store file hashes related to this buyer
    default: [],
  },
});

module.exports = mongoose.model("SpaceBuyer", spaceBuyerSchema);
