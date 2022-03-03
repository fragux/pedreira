const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const client = require ('twilio')('AC30d90c932ea37c30c67b90ed466a24ad','d2994d9914dcabe2dd60190c96fb4b0d');

const db = mysql.createPool({
    host: 'orion.morecolab.pt',
    port: '5505',
    user: 'pedra',
    password: 'pedra',
    insecureAuth : true,
    database: 'db',
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));


   


app.post('/sendnotification', (req, res) => {
    const data = req.body.data;
    console.log("Mensagem a enviar: ", data);
    client.messages 
    .create({ 
       body: data,  
       messagingServiceSid: 'MGb2518061199ca35940162d5cc523d424',      
       to: '+351937012912' 
     }) 
    .then(message => console.log(message.sid)) 
    .done();
    res.json('Mensagem enviada!');
});


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

app.get('/lousada2020', (req, res) =>{
    const sqlSelect = "SELECT * FROM lousada2020 ";
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
app.get('/lousada2020/last', (req, res) =>{
    const sqlSelect = "SELECT * FROM lousada2020 ORDER BY data_hora DESC LIMIT 10";
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
app.get('/lousada2020/dia', (req, res) =>{
    const sqlSelect = "SELECT * FROM lousada2020 ORDER BY data_hora DESC LIMIT 8";
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
app.get('/lousada2020/semana', (req, res) =>{
    const sqlSelect = "SELECT * FROM lousada2020 ORDER BY data_hora DESC LIMIT 16";
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
app.get('/lousada2020/mes', (req, res) =>{
    const sqlSelect = "SELECT * FROM lousada2020 ORDER BY data_hora DESC LIMIT 30";
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

app.listen(3001, ()=> {
    console.log("Running on port 3001")
});