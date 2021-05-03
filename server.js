'use strict'

const express = require('express');
const { sso } = require('node-expose-sspi');

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

app.use(sso.auth());

app.use((req, res, next) => {
    res.json({
        sso: req.sso,
    });
});

server.listen(port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
