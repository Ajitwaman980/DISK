const express = require("express");
const router = express.Router();
const SpaceRent = require("../model/spaceBuyerSchema ");

// (for Node 2 Client)
router.post("/rent", async (req, res) => {
  try {
    const { clientId, ownerId, rentedSpace } = req.body;

    // Find the space allocated by the provider (Node 1)
    const space = await SpaceRent.findOne({ ownerId });
    if (!space) {
      return res
        .status(400)
        .json({ message: "No space allocated by this owner" });
    }

    const availableSpace = SpaceRent.allocatedSpace - SpaceRent.usedSpace;
    if (rentedSpace > availableSpace) {
      return res
        .status(400)
        .json({ message: "Not enough space available for rent" });
    }

    // Add the client (Node 2) as a renter and allocate the rented space
    space.renters.push({
      clientId,
      rentedSpace,
    });

    // Update the used space by adding the rented amount
    space.usedSpace += rentedSpace;

    // Save
    await space.save();

    res.status(201).json({
      message: "Space rented successfully",
      ownerId: space.ownerId,
      clientId: clientId,
      rentedSpace: rentedSpace,
    });
  } catch (error) {
    res.status(500).json({ message: "Error renting space", error });
  }
});

module.exports = router;
