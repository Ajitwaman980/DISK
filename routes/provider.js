const express = require("express");
const router = express.Router();
const Space = require("../model/spaceProviderSchema ");

router.post("/allocate", async (req, res) => {
  try {
    const { allocatedSpace } = req.body;

    console.log("Allocating space", allocatedSpace, "GB");
    let space = await Space.findOne({ ownerId });
    if (space) {
      return res
        .status(400)
        .json({ message: "Space already allocated by this owner" });
    }

    // Create a new space allocation for the provider
    space = new Space({
      ownerId,
      allocatedSpace,
    });

    // Save the allocated space
    await space.save();

    res.status(201).json({
      message: "Space allocated successfully",
      ownerId: space.ownerId,
      allocatedSpace: space.allocatedSpace,
    });
  } catch (error) {
    res.status(500).json({ message: "Error allocating space", error });
  }
});

module.exports = router;
