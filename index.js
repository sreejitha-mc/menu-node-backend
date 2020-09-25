const express = require('express')
var mysql = require('mysql');
const app = express()
const port = 4100;
var cors = require('cors');

app.use(cors())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thunderbird",
    database: "menu"
});

con.connect(function (err) {
    if (err) throw err;
});

app.get('/menu', (req, res) => {
    var qry = `SELECT * FROM items WHERE ${req.query.parent_id ? `parent_id = ${req.query.parent_id}` : `parent_id IS NULL`}`;
    con.query(qry, function (err, result) {
        if (err) throw err;
        res.json(result);
    });

});

app.post('/create-menu', (req, res) => {
    if (req.query.item && (!req.query.parent_id || req.query.parent_id == '')) {
        var qry = `INSERT INTO items SET item = '${req.query.item}',parent_id = NULL`;
        con.query(qry, function (err, result) {
            if (err) throw err;
            res.json('succes');
        });

    } else if (req.query.item) {
        var qry = `INSERT INTO items SET item = '${req.query.item}',parent_id = ` + parseInt(req.query.parent_id);
        con.query(qry, function (err, result) {
            if (err) throw err;
            res.json('succes');
        });
    }

});

app.put('/edit-menu', (req, res) => {
    if (req.query.item && req.query.id) {
        var qry = `UPDATE items SET item = '${req.query.item}' WHERE id = '${req.query.id}'`;
        con.query(qry, function (err, result) {
            if (err) throw err;
            res.json('succes');
        });

    }

});

app.delete('/delete-menu', (req, res) => {
    if (req.query.id) {
        var qry = `DELETE FROM items WHERE id = '${req.query.id}'`;
        con.query(qry, function (err, result) {
            if (err) throw err;
            res.json('succes');
        });

    }

});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});