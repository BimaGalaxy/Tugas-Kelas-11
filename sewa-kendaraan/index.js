const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router endpoint
const kendaraanRouter = require("./kendaraan"); 
const penyewaRouter = require("./penyewa"); 
const pemilikRouter = require("./pemilik"); 

// use router 
app.use("/kendaraan", kendaraanRouter);
app.use("/penyewa", penyewaRouter);
app.use("/pemilik", pemilikRouter);

app.listen(8000, () => {
  console.log("Run: 8000");
});
