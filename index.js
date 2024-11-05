import express from "express";
import connectDb from "./config/db.js";
// import ProviderAllocate from "./routes/provider.js";
import ProviderAllocate from "./routes/provider.js";
import RentSapce from "./routes/buyer.js";
import ejs from "ejs";
import path from "path";
import ipfs_file from "./routes/ipfs.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 4040;
// connection
connectDb();

// Set view engine
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

// Testing routes
app.get("/", (req, res) => {
  res.render("welcome.ejs");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(path());
// Routes
app.use("/provider", ProviderAllocate);
app.use("/rent", RentSapce);
app.use("/", ipfs_file);

// Start the server
app.listen(port, () => {
  console.log("Server started on port 4040");
});
