const express = require("express");
const app = express();
const db_connection = require("./config/db");
const allocate = require("./routes/provider");
const port = 4040;

app.get("/", (req, res) => {
  res.send("success");
});
app.use(express.json());
app.use("/provider", allocate);

app.listen(port, () => {
  console.log("server stared 4040");
});
