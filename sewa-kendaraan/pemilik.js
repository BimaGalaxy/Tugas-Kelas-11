// routes/kendaraan.js
const express = require("express");
const router = express.Router();
const db = require("./koneksi");

//get pemilik 
router.get("/", (req, res) => {
  let sql = "select * from pemilik";
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

//post pemilik 
router.post("/", (req, res) => {

    let data = {
        nik_pemilik: req.body.nik_pemilik,
        nama_pemilik: req.body.nama_pemilik,
        password: req.body.password,
        username: req.body.username,
        id_kendaraan: req.body.id_kendaraan
    };

    // create sql query insert
    let sql = "insert into pemilik set ?";
  
    // run query
    db.query(sql, data, (error, result) => {
      let response = null;
      if (error) {
        response = {
          message: error.message,
        };
      } else {
        response = {
          message: result.affectedRows + " data inserted",
          nik_pemilik: data.nik_pemilik,
          nama_pemilik: data.nama_pemilik,
          password: data.password,
          username: data.username,
          id_kendaraan: data.id_kendaraan,
        };
      }
      res.json(response); // send response
    });
});

// Update pemilik
router.put("/", (req, res) => {
    // prepare data
    let data = {
        nama_pemilik: req.body.nama_pemilik,
        password: req.body.password,
        username: req.body.username,
    };
  
    let parameter = {
        nik_pemilik: req.body.nik_pemilik,
    }
  
    let sql = "update pemilik set ? where ?";
  
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
          nik_pemilik: data.nik_pemilik,
          nama_pemilik: data.nama_pemilik,
          password: data.password,
          username: data.username,
        };
      }
      res.json(response);
    });
});

//Delete pemilik
router.delete("/:nik_pemilik", (req,res) => {
    // prepare data
    let data = {
        nik_pemilik: req.params.nik_pemilik
    }

    // create query sql delete
    let sql = "delete from pemilik where ?"

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

// //post kendaraan 
// router.post("/", (req, res) => {
//     // prepare data
//     let data = {
//         nama_kendaraan: req.body.nama_kendaraan,
//         plat_nomor: req.body.plat_nomor,
//         merk_kendaraan: req.body.merk_kendaraan,
//     };
  
//     // create sql query insert
//     let sql = "insert into kendaraan set ?";
  
//     // run query
//     db.query(sql, data, (error, result) => {
//       let response = null;
//       if (error) {
//         response = {
//           message: error.message,
//         };
//       } else {
//         response = {
//           message: result.affectedRows + " data inserted",
//           nama: data.nama_kendaraan,
//           plat: data.plat_nomor,
//           merk: data.merk_kendaraan,
//         };
//       }
//       res.json(response); // send response
//     });
// });

module.exports = router;