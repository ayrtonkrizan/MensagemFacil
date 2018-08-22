'use strict';
const app = require('../config/server');
const db = require('./firebase');

app.post('/message', (req, res) =>{
    var clients = db.clients();
    
    var client = clients[req.body.client];
    if(client === undefined)
        return res.status(404).json({ErrorMessage: "Cliente não encontrado"});

    if(client.token !== req.body.token)
        return res.status(404).json({ErrorMessage: "Token inválido"});
    
    var message={};
    message = {
        phones: req.body.telefones,
        text: req.body.mensagem,
        sent: false
    }
    db.message_insert(message)
        .then((ret) => res.status(200).json(ret.msg))
        .catch((err) => res.status(500).json(err.msg));
});


module.exports = app;