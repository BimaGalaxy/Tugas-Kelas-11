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

router.get("/:nik_pemilik", (req, res) => {
  const nik = req.params.nik_pemilik;

  const sql = `
    SELECT pemilik.*, kendaraan.*
    FROM pemilik
    INNER JOIN kendaraan ON pemilik.id_kendaraan = kendaraan.id_kendaraan
    WHERE pemilik.nik_pemilik = ?`;

  db.query(sql, nik, (error, result) => {
    if (error) {
      res.json({
        message: error.message,
      });
    } else {
      if (result.length > 0) {
        const response = {
          pemilik: result.map((row) => ({
            nama_pemilik: row.nama_pemilik,
            Merk_kendaraan: row.merk_kendaraan,
            Nama_kendaraan: row.nama_kendaraan,
            Merk_kendaraan: row.merk_kendaraan,
            Plat_nomor: row.plat_nomor,
          })),
        };
        res.json(response);
      } else {
        res.json({
          message: "Pemilik tidak ditemukan",
        });
      }
    }
  });
});

//Post pemilik
router.post("/", (req, res) => {
  let kendaraanData = {
    nama_kendaraan: req.body.nama_kendaraan,
    plat_nomor: req.body.plat_nomor,
    merk_kendaraan: req.body.merk_kendaraan,
    status_kendaraan: "Tersedia",
  };

  // create SQL query insert for kendaraan
  let kendaraanSQL = "INSERT INTO kendaraan SET ?";

  // query kendaraan
  db.query(kendaraanSQL, kendaraanData, (error, kendaraanResult) => {
    if (error) {
      res.json({
        message: error.message,
      });
    } else {
      // Mendapatkan id_kendaraan yang baru saja diinput
      const id_kendaraan_new = kendaraanResult.insertId;

      let pemilikData = {
        nik_pemilik: req.body.nik_pemilik,
        nama_pemilik: req.body.nama_pemilik,
        password: req.body.password,
        username: req.body.username,
        id_kendaraan: id_kendaraan_new, 
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

//Update Pemilik

//     "nik_pemilik": "",
//     "nama_pemilik": "",
//     "username": "",
//     "password": "",

router.put("/", (req, res) => {
  const parameter = {
    nik_pemilik: req.body.nik_pemilik
  };
  
  const data = {
    nama_pemilik: req.body.nama_pemilik,
    username: req.body.username,
    password: req.body.password,
  }

  // Ganti nama tabel sesuai dengan tabel yang akan diubah
  let sqlPemilik = "UPDATE pemilik SET ? WHERE ?";

  db.query(sqlPemilik, [data, parameter], (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message,
      }
    } else {
      response = {
        message: "Data Berhasil Diupdate",
      }
    }
    res.json(response);
  })
})


// Update kendaraan pemilik

//     "nik_pemilik": "",
//     "id_kendaraan": "",
//     "nama_kendaraan": "",
//     "merk_kendaraan": "",
//     "plat_nomor": ""

router.put("/kendaraan", (req, res) => {
  
  const pemilik_nik = req.body.nik_pemilik;
  const id_kendaraan = req.body.id_kendaraan;

  // memeriksa kepemilikan
  const cekPemilik = "SELECT * FROM kendaraan WHERE id_kendaraan = ? AND id_kendaraan = (SELECT id_kendaraan FROM pemilik WHERE nik_pemilik = ?)";

  db.query(cekPemilik, [id_kendaraan, pemilik_nik], (error, result) => {
    if (error) {
      res.json({
        message: error.message,
      });
    } else {
      if (result.length > 0) {
        // Pemilik memiliki kendaraan, izinkan pemilik untuk mengedit
        const data = {
          // Data yang ingin diupdate
          nama_kendaraan: req.body.nama_kendaraan,
          plat_nomor: req.body.plat_nomor,
          merk_kendaraan: req.body.merk_kendaraan,
        };

        const updateKendaraanSQL = "UPDATE kendaraan SET ? WHERE id_kendaraan = ?";
        db.query( updateKendaraanSQL, [data, id_kendaraan], (error, updateResult) => {

            if (error) {
              res.json({
                message: error.message,
              });
            } else {
              res.json({
                message: "Data kendaraan berhasil diupdate",
              });
            }

          }
        );
      } else {
        // Pemilik tidak memiliki kendaraan tersebut, beri pesan kesalahan
        res.json({
          message: "Pemilik tidak memiliki kendaraan dengan ID tersebut",
        });
      }
    }
  });
});

//Delete pemilik
router.delete("/:nik_pemilik", (req, res) => {
  const nik_pemilik = req.params.nik_pemilik;

  // Buat query SQL untuk menghapus kendaraan milik pemilik
  const deleteKendaraanSQL =
    "DELETE FROM kendaraan WHERE id_kendaraan = (SELECT id_kendaraan FROM pemilik WHERE nik_pemilik = ?)";

  // Buat query SQL untuk menghapus pemilik
  const deletePemilikSQL = "DELETE FROM pemilik WHERE nik_pemilik = ?";

  // Jalankan query SQL untuk menghapus kendaraan
  db.query(deleteKendaraanSQL, nik_pemilik, (error, kendaraanResult) => {
    if (error) {
      res.json({
        message: error.message,
      });
    } else {
      // Jalankan query SQL untuk menghapus pemilik setelah kendaraan terhapus
      db.query(deletePemilikSQL, nik_pemilik, (error, pemilikResult) => {
        if (error) {
          res.json({
            message: error.message,
          });
        } else {
          res.json({
            message: "Data Berhasil Dihapus",
          });
        }
      });
    }
  });
});

module.exports = router;
