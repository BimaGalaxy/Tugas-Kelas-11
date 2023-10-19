// routes/kendaraan.js
const express = require("express");
const router = express.Router();
const db = require("./koneksi");
// const crypto = require('crypto');

// Fungsi untuk mengenkripsi password ke MD5
// function encryptPassword(password) {
//   return crypto.createHash('md5').update(password).digest('hex');
// }

//get penyewa 
router.get("/", (req, res) => {
  let sql = "select * from penyewa";
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

//post penyewa 
router.post("/", (req, res) => {
    // prepare data
    // let encryptedPassword = encryptPassword(req.body.password);

    // let { nik_penyewa, nama_penyewa, alamat_penyewa, username, password, no_telp } = req.body;

    // const data = {
    //     nik_penyewa: nik_penyewa,
    //     nama_penyewa: nama_penyewa,
    //     alamat_penyewa: alamat_penyewa,
    //     username: username,
    //     password: encryptedPassword, // Simpan kata sandi yang telah dienkripsi
    //     no_telp: no_telp,
    //   };

    let data = {
        nik_penyewa: req.body.nik_penyewa,
        nama_penyewa: req.body.nama_penyewa,
        alamat_penyewa: req.body.alamat_penyewa,
        password: req.body.password,
        username: req.body.username,
        no_telp: req.body.no_telp,
    };

    // create sql query insert
    let sql = "insert into penyewa set ?";
  
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
          nik_penyewa: data.nik_penyewa,
          nama_penyewa: data.nama_penyewa,
          alamat_penyewa: data.alamat_penyewa,
          no_telp: data.no_telp,
          username: data.username,
          password: data.password,
        };
      }
      res.json(response); // send response
    });
});

// Update kendaraan
router.put("/", (req, res) => {
    // prepare data
    let data = {
        nama_penyewa: req.body.nama_penyewa,
        alamat_penyewa: req.body.alamat_penyewa,
        password: req.body.password,
        username: req.body.username,
        no_telp: req.body.no_telp,
    };
  
    let parameter = {
        nik_penyewa: req.body.nik_penyewa,
    }
  
    let sql = "update penyewa set ? where ?";
  
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
          nama_penyewa: data .nama_penyewa,
          alamat_penyewa: data .alamat_penyewa,
          password: data .password,
          username: data .username,
          no_telp: data .no_telp,
        };
      }
      res.json(response); // send response
    });
});

//Delete kendaraan
router.delete("/:nik_penyewa", (req,res) => {
    // prepare data
    let data = {
        nik_penyewa: req.params.nik_penyewa
    }

    // create query sql delete
    let sql = "delete from penyewa where ?"

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