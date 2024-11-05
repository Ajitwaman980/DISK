// Import mongoose
import mongoose from "mongoose";

const spaceProviderSchema = new mongoose.Schema({
  spaceProvider_ID: {
    type: mongoose.Types.ObjectId,
  },
  providerId: {
    type: String, // metamask id
    required: true,
    unique: true,
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
      buyerId: String, // ID of the buyer (client)
      rentedSpace: Number, // how much want
    },
  ],
  ipfsHashes: {
    type: [String], // To store file hashes (if files are uploaded)
    default: [],
  },
});

// Export the model
export default mongoose.model("SpaceProvider", spaceProviderSchema);
