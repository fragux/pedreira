const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const db = mysql.createPool({
    host: 'orion.morecolab.pt',
    port: '5505',
    user: 'pedra',
    password: 'pedra',
    insecureAuth : true,
    database: 'db',
})


router.get('/machine/lousada', (req, res) =>{
    const sqlSelect = "SELECT * from db.Lousada WHERE Date(DateTime) = CURDATE()";
    db.query(sqlSelect, (err, result) =>{
        if (err){
            console.log(err);
        }
        else {
            res.send(result);
            console.log(result);
        }
    })
});

router.get('/machine/lousada/last', (req, res) =>{
    const sqlSelect = "SELECT * FROM db.Lousada WHERE Date(DateTime) = CURDATE() ORDER BY `DateTime` DESC LIMIT 1";
    db.query(sqlSelect, (err, result) =>{
        if (err){
            console.log(err);
        }
        else {
            res.send(result);
            console.log(result);
        }
    })
});

router.get('/machine/lousada/start', (req, res) =>{
    const sqlSelect = "SELECT * FROM `Lousada` WHERE DATE(DateTime) = CURDATE() AND Start = 1 Limit 1";    
    db.query(sqlSelect, (err, result) =>{
        if (err){
            console.log(err);
        }
        else {
            res.send(result);
            console.log(result);
        }
    })
});



module.exports = (router);


