const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.get('/monofio', (req, res) =>{
    const sqlSelect = "SELECT * FROM monofio";
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
app.get('/monofio/last', (req, res) =>{
    const sqlSelect = "SELECT * FROM monofio ORDER BY data_hora DESC LIMIT 10";
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
app.get('/monofio/dia', (req, res) =>{
    const sqlSelect = "SELECT * FROM monofio ORDER BY data_hora DESC LIMIT 8";
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
app.get('/monofio/semana', (req, res) =>{
    const sqlSelect = "SELECT * FROM monofio ORDER BY data_hora DESC LIMIT 16";
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
app.get('/monofio/mes', (req, res) =>{
    const sqlSelect = "SELECT * FROM monofio ORDER BY data_hora DESC LIMIT 30";
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