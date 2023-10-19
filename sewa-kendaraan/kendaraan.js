// routes/kendaraan.js
const express = require("express");
const router = express.Router();
const db = require("./koneksi");

//get kendaraan 
router.get("/", (req, res) => {
  let sql = "select * from kendaraan";
  db.query(sql, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message,
      };
    } else {
      response = {
        data: result,
      };
    }
    res.json(response);
  });
});

// Update kendaraan
router.put("/", (req, res) => {
    // prepare data
    let data = {
        nama_kendaraan: req.body.nama_kendaraan,
        plat_nomor: req.body.plat_nomor,
        merk_kendaraan: req.body.merk_kendaraan,
    }
  
    let parameter = {
        id_kendaraan: req.body.id_kendaraan,
    }
  
    let sql = "update kendaraan set ? where ?";
  
    // run query
    db.query(sql, [data, parameter], (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          message: result.affectedRows + " data updated",
          nama: data.nama_kendaraan,
          plat: data.plat_nomor,
          merk: data.merk_kendaraan,
        };
      }
      res.json(response); // send response
    });
});

//Delete kendaraan
router.delete("/:id_kendaraan", (req,res) => {
    // prepare data
    let data = {
        id_kendaraan: req.params.id_kendaraan
    }

    // create query sql delete
    let sql = "delete from kendaraan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

module.exports = router;