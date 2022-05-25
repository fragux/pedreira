const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.get('/serra3500', (req, res) =>{
    const sqlSelect = "SELECT * FROM serra3500 ";
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
app.get('/serra3500/last', (req, res) =>{
    const sqlSelect = "SELECT * FROM serra3500 ORDER BY data_hora DESC LIMIT 10";
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
app.get('/serra3500/dia', (req, res) =>{
    const sqlSelect = "SELECT * FROM serra3500 ORDER BY data_hora DESC LIMIT 8";
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
app.get('/serra3500/semana', (req, res) =>{
    const sqlSelect = "SELECT * FROM serra3500 ORDER BY data_hora DESC LIMIT 16";
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
app.get('/serra3500/semana', (req, res) =>{
    const sqlSelect = "SELECT * FROM serra3500 ORDER BY data_hora DESC LIMIT 30";
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