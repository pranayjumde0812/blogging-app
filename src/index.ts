import express = require("express");
import cors = require("cors");

const app = express();
app.use(cors());

app.listen(5000, () => {
  console.log("app is running");
});
