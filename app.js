let usePort = 3000;

let express = require('express');
let app = new express();

let db = require('./db.js'); // Requiring the database module.

app.use(express.static('public'));

app.get('/db/testConnection', (req, res) => {
    db.test((testRes) => {
        res.send(String(testRes));
    });
});

app.get('/db/addPackage', (req, res) => {
    if(req.query["pId"] != undefined && req.query["bCode"] != undefined) {
        let date = new Date();
        let useDate = `${date.getDate()}/${date.getMonth()+1}-${date.getFullYear()}`;
        db.query(`INSERT INTO packages (palletId, date, barcode) VALUES ('${req.query['pId']}', '${String(useDate)}', '${req.query['bCode']}') `, (queryRes) => {
            res.send(queryRes);
            res.end();
        });
    }
});

app.get('/db/getPallets', (req, res) => {
    db.query(`SELECT * FROM pallets`, (queryRes) => {
        res.send(queryRes);
        res.end();
    });
    
});

app.listen(usePort, (err) => {
    console.log(err ? `[~] An error occoured!` : `[~] Listening on port ${usePort}!`);
});