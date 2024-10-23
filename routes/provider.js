const express = require("express");
const router = express.Router();
const Space = require("../model/spaceProviderSchema ");

router.post("/allocate", async (req, res) => {
  try {
    const { providerId, allocatedSpace } = req.body;

    console.log("Allocating space", allocatedSpace, "GB");
    let space = await Space.findOne({ providerId });
    if (space) {
      return res
        .status(400)
        .json({ message: "Space already allocated by this owner" });
    }

    const data = new Space({
      providerId,
      allocatedSpace,
    });

    // Save the allocated space
    await data.save();

    res.status(201).json({
      message: "Space allocated successfully",
      providerId: space.providerId,
      allocatedSpace: space.allocatedSpace,
    });
  } catch (error) {
    res.status(500).json({ message: "Error allocating space", error });
  }
});

module.exports = router;
