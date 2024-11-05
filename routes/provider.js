import express from "express";
// import path from "path";
import Space from "../model/spaceProviderSchema.js";
import Buyer from "../model/spaceBuyerSchema.js";

const router = express.Router();

// Route to get all spaces and buyers
router.get("/", async (req, res) => {
  try {
    const data = await Space.find();
    const buyerdata = await Buyer.find();
    res.render("../views/index.ejs", { data, buyerdata });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving data");
  }
});

// Route to allocate space
router.post("/allocate", async (req, res) => {
  try {
    const { providerId, allocatedSpace } = req.body;

    console.log("Allocating space", allocatedSpace, "GB");

    // Check if space is already allocated by this owner
    let space = await Space.findOne({ providerId });
    if (space) {
      return res
        .status(400)
        .json({ message: "Space already allocated by this owner" });
    }

    // Create new space allocation
    const data = new Space({
      providerId,
      allocatedSpace,
    });

    await data.save();

    res.redirect("/");
  } catch (error) {
    console.error("Error allocating space:", error);
    res.status(500).json({ message: "Error allocating space", error });
  }
});

export default router;
