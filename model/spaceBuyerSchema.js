// Import mongoose
import mongoose from "mongoose";

//  SpaceBuyer schema
const spaceBuyerSchema = new mongoose.Schema({
  spaceBuyer_ID: {
    type: mongoose.Types.ObjectId,
  },
  buyerId: {
    type: String, // MetaMask ID
    required: true,
    unique: true,
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
    type: [String],
    default: [],
  },
});

// Export the model
export default mongoose.model("SpaceBuyer", spaceBuyerSchema);
