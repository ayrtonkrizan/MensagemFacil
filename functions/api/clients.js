'use strict';
const app = require('../config/server');
const uuid = require('uuid');
const db = require('./firebase');


app.post('/clients', (req, res) =>{ //Quando tiverem varios numeros para enviar mensagem criar lógica aqui.
    var clients = db.clients();
    var client;
    if(!req.body.email)
        return res.status(404).json({ErrorMessage: "Enviar Email"});
    if(!req.body.cpf)
        return res.status(404).json({ErrorMessage: "Enviar CPF"});

    if(clients.length === 0)
        clients = db.clients();

    client = clients[req.body.cpf];
    if(client === undefined){
        client = {
            cpf: req.body.cpf,
            lastMessage: new Date(),
            totalMessages: 0,
            monthMessages:0,
            token: uuid.v1(),
            accountGroup: 0 //TODO: Usar esse campo para ver o nivel da conta
        /*Inserir outros campos necessários aqui*/
        }
    }
    client.nome = req.body.nome,
    client.email = req.body.email,
    client.accountGroup = 0 //TODO: Usar esse campo para ver o nivel da conta
    /*Inserir outros campos necessários aqui*/

    db.client_insert(client)
        .then((ret) => res.status(200).json(ret.msg))
        .catch((err) => res.status(500).json(err.msg));
});

app.get('/clients/:cpf', (req, res) =>{
    var clients = db.clients();
    console.log(clients);
    console.log(clients[req.params.cpf]);
    return res.status(200).json(clients[req.params.cpf]);
});


module.exports = app;