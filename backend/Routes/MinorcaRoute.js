const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.get('/minorca', (req, res) =>{
    const sqlSelect = "SELECT * FROM minorca ";
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
app.get('/minorca/last', (req, res) =>{
    const sqlSelect = "SELECT * FROM minorca ORDER BY data_hora DESC LIMIT 10";
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

app.get('/minorca/dia', (req, res) =>{
    const sqlSelect = "SELECT * FROM minorca ORDER BY data_hora DESC LIMIT 8";
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
app.get('/minorca/semana', (req, res) =>{
    const sqlSelect = "SELECT * FROM minorca ORDER BY data_hora DESC LIMIT 16";
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
app.get('/minorca/mes', (req, res) =>{
    const sqlSelect = "SELECT * FROM minorca ORDER BY data_hora DESC LIMIT 30";
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