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
    default: 0, // default 0
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
