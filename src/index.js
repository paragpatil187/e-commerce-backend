const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost",
      "http://0.0.0.0:3000",
      "http://127.0.0.1:3000",
      "http://10.10.10.146:3000",
      "http://192.168.46.242:3000",
    ],
    credentials: true,
  })
);

///Routes

const product = require("./routes/productRoute");
const user =require("./routes/userRoute")
app.use("/api", product);
app.use('/api',user)
module.exports = app;
