import express from "express";
import multer from "multer";
import { create } from "ipfs-http-client";

const ipfs = create(
  "https://mainnet.infura.io/v3/68c7a8195d7244e384046804087783a4"
);
const router = express.Router();
const upload = multer({ storge: multer.memoryStorage() });
// const ipfs = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization:
//       "Basic " +
//       Buffer.from("YOUR_PROJECT_ID:68c7a8195d7244e384046804087783a4").toString("base64"),
//   },
// });

// Upload file to IPFS
router.post("/upload", upload.single("img_file"), async (req, res) => {
  try {
    const file = req.file;
    console.log("this is file ", file);
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // res.send("done uploading");
    // Add the file data to IPFS
    const fileBuffer = file.buffer;
    const addedfile = await ipfs.add(fileBuffer);
    // res.json({ hash: addedfile.path
    console.log(addedfile);
    // res.json(addedfile.path);
    res.json({ hash: addedfile.path.toString() });
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    res.status(500).json({ message: "Error uploading file", error });
  }
});

// Retrieve file from IPFS
router.get("/file/:hash", async (req, res) => {
  try {
    const hash = req.params.hash;
    const file = await ipfs.cat(hash);
    res.send(file);
  } catch (error) {
    console.error("Error retrieving file from IPFS:", error);
    res.status(500).json({ message: "Error retrieving file", error });
  }
});

export default router;
