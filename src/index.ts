import express = require("express");
import cors = require("cors");
import { env } from "./config/config";

const app = express();
app.use(cors());

app.listen(env.PORT, () => {
  console.log("app is running on ", env.PORT);
});
