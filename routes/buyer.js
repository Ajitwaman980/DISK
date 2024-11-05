import express from "express";
import SpaceBuyer from "../model/spaceBuyerSchema.js"; // buyer
import Provider from "../model/spaceProviderSchema.js"; // Import provider model

const router = express.Router();

// (for Node 2 Client)
router.post("/buyer", async (req, res) => {
  console.log("Renting request tested");
  const { buyerId, providerId, rentedSpace } = req.body;
  // console.log(buyerId, providerId, rentedSpace);

  try {
    // Find the provider to verify they exist
    const provider = await Provider.findOne({ providerId });
    if (!provider) {
      return res.status(400).json({ message: "Provider not found" });
    }

    // Check available space in the provider
    const availableSpace = provider.allocatedSpace - provider.usedSpace;
    if (rentedSpace > availableSpace) {
      return res
        .status(400)
        .json({ message: "Not enough space available for rent" });
    }

    // Add the client (Node 2) as a renter and allocate the rented space
    provider.renters.push({
      buyerId,
      rentedSpace,
    });
    // buyer data
    const buyerSpace = new SpaceBuyer({
      buyerId,
      rentedSpace,
      providerId,
    });

    // Update usedSpace
    provider.usedSpace += rentedSpace;

    // Save changes to the provider and buyer space
    await provider.save();
    await buyerSpace.save();

    res.status(201).json({
      message: "Space rented successfully",
      providerId: provider.providerId,
      clientId: buyerId,
      rentedSpace: rentedSpace,
    });
  } catch (error) {
    console.error(error); // Log error to see details in console
    res.status(500).json({ message: "Error renting space client side", error });
  }
});

export default router;
