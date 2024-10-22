const mongoose = require("mongoose");

const spaceProviderSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
  },
  allocatedSpace: {
    type: Number, // Space allocated in GB
    required: true,
  },
  usedSpace: {
    type: Number,
    default: 0, // Initially no space is used
  },
  renters: [
    {
      buyerId: String, // ID of the buyer (cleint )
      rentedSpace: Number, // how much want
    },
  ],
  ipfsHashes: {
    type: [String], // To store file hashes (if files are uploaded)
    default: [],
  },
});

module.exports = mongoose.model("SpaceProvider", spaceProviderSchema);
