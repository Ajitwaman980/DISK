const express = require("express");
const app = express();
const db_connection = require("./config/db");
const ProviderAllocate = require("./routes/provider");
const RentSapce = require("./routes/buyer");
const port = 4040;

app.get("/", (req, res) => {
  res.send("success");
});
app.use(express.json());
app.use("/provider", ProviderAllocate);
app.use("/rent", RentSapce);

app.listen(port, () => {
  console.log("server stared 4040");
});
