'use strict'

const express = require('express');
const fs = require('fs');
const { sso } = require('node-expose-sspi');

const app = express();
//const server = require('http').createServer(app);
const server = require('https').createServer({
    key: fs.readFileSync('./cert/node-server.key', 'utf8'),
    cert: fs.readFileSync('./cert/node-server.cer', 'utf8'),
    ca: fs.readFileSync('./cert/ca.cer')
}, app);
const port = process.env.PORT || 443;

app.use(sso.auth());

app.use((req, res, next) => {
    res.json({
        sso: req.sso,
    });
});

server.listen(port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
