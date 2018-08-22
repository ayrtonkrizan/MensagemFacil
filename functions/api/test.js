'use strict';
const app = require('../config/server');
const db = require('./firebase');

app.get('/test', (req, res) =>{
    res.status(200).json({status: 'ok'});
});

app.get('/test/clients', (req, res) =>{
    res.status(200).json(db.clients());
});

app.get('/test/messages', (req, res) =>{
    res.status(200).json(db.messages());
});