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

//endpoint para CNC - STONECUT

router.get('/machine/cnc1', (req, res) =>{
    const sqlSelect = "SELECT * FROM `CNC1`";
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

router.get('/machine/cnc1/last', (req, res) =>{
    const sqlSelect = "SELECT * FROM `CNC1` ORDER BY `DateTime` DESC LIMIT 1";
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


router.get('/machine/cnc1/job', (req, res) =>{
    const sqlSelect = "SELECT DateTime, Job, Production, Production - LAG(Production) OVER (PARTITION BY Job ORDER BY DateTime) AS nJob FROM `CNC1` WHERE DATE(DateTime) = CURDATE()  AND Job = 0 AND Production = 0 ";
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

router.get('/machine/cnc1/start', (req, res) =>{
    const sqlSelect = "SELECT * FROM `CNC1` WHERE DATE(DateTime) = CURDATE() AND Tension >20 Limit 1";    
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