const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./koneksi");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router untuk setiap endpoint
const kendaraanRouter = require("./kendaraan"); 
const penyewaRouter = require("./penyewa"); 
const pemilikRouter = require("./pemilik"); 

//pengunaan router untuk grup endpoint
app.use("/kendaraan", kendaraanRouter);
app.use("/penyewa", penyewaRouter);
app.use("/pemilik", pemilikRouter);

app.listen(8000, () => {
  console.log("Program berjalan port 8000");
});
