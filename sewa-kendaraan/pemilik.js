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

//Post pemilik
router.post("/", (req, res) => {
  let kendaraanData = {
      nama_kendaraan: req.body.nama_kendaraan,
      plat_nomor: req.body.plat_nomor,
      merk_kendaraan: req.body.merk_kendaraan,
      status_kendaraan: 'Tersedia',
  };

  // create SQL query insert for kendaraan
  let kendaraanSQL = "INSERT INTO kendaraan SET ?";
  
  // run query for kendaraan
  db.query(kendaraanSQL, kendaraanData, (error, kendaraanResult) => {
      if (error) {
          res.json({
              message: error.message,
          });
      } else {
          // Mendapatkan id_kendaraan yang baru saja diinput
          const id_kendaraan_baru = kendaraanResult.insertId;

          let pemilikData = {
              nik_pemilik: req.body.nik_pemilik,
              nama_pemilik: req.body.nama_pemilik,
              password: req.body.password,
              username: req.body.username,
              id_kendaraan: id_kendaraan_baru, // Menggunakan id_kendaraan yang baru saja diinput
          };

          // create SQL query insert for pemilik
          let pemilikSQL = "INSERT INTO pemilik SET ?";

          // run query for pemilik
          db.query(pemilikSQL, pemilikData, (error, pemilikResult) => {
              if (error) {
                  res.json({
                      message: error.message,
                  });
              } else {
                  res.json({
                      message: "Pemilik and kendaraan data inserted",
                      pemilik: pemilikData,
                      kendaraan: kendaraanData,
                  });
              }
          });
      }
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
router.delete("/:nik_pemilik", (req, res) => {
  const nik_pemilik = req.params.nik_pemilik;

  // Buat query SQL untuk menghapus kendaraan milik pemilik
  const deleteKendaraanSQL = "DELETE FROM kendaraan WHERE id_kendaraan = (SELECT id_kendaraan FROM pemilik WHERE nik_pemilik = ?)";

  // Buat query SQL untuk menghapus pemilik
  const deletePemilikSQL = "DELETE FROM pemilik WHERE nik_pemilik = ?";

  // Jalankan query SQL untuk menghapus kendaraan
  db.query(deleteKendaraanSQL, nik_pemilik, (error, kendaraanResult) => {
      if (error) {
          res.json({
              message: error.message
          });
      } else {
          // Jalankan query SQL untuk menghapus pemilik setelah kendaraan terhapus
          db.query(deletePemilikSQL, nik_pemilik, (error, pemilikResult) => {
              if (error) {
                  res.json({
                      message: error.message
                  });
              } else {
                  res.json({
                      message: "Data pemilik dan kendaraannya dihapus"
                  });
              }
          });
      }
  });
});


// router.delete("/:nik_pemilik", (req,res) => {
//     // prepare data
//     let data = {
//         nik_pemilik: req.params.nik_pemilik
//     }

//     // create query sql delete
//     let sql = "delete from pemilik where ?"

//     // run query
//     db.query(sql, data, (error, result) => {
//         let response = null
//         if (error) {
//             response = {
//                 message: error.message
//             }
//         } else {
//             response = {
//                 message: result.affectedRows + " data deleted"
//             }
//         }
//         res.json(response) // send response
//     })
// })

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