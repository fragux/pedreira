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