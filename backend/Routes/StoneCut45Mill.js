const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
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

//endpoint para CNC - STONECUT45MILL

router.get('/machine/cnc2', (req, res) =>{
    const sqlSelect = "SELECT * FROM `CNC2` ";
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



router.get('/machine/cnc2/last', (req, res) =>{
    const sqlSelect = "SELECT * FROM `CNC2` ORDER BY `DateTime` DESC LIMIT 1";
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

router.get('/machine/cnc2/job', (req, res) =>{
    const sqlSelect = "SELECT DateTime, Job, Production FROM `CNC2` WHERE DATE(DateTime) = CURDATE() AND Job = 1 AND Production = 0";
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

router.get('/machine/cnc2/start', (req, res) =>{
    const sqlSelect = "SELECT * FROM `CNC2` WHERE DATE(DateTime) = CURDATE() AND Tension >20 Limit 1";    
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