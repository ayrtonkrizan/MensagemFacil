'use strict';
const app = require('../config/server');
const db = require('./firebase');

app.post('/message', (req, res) =>{
    var clients = db.clients();
    while(clients.length === 0){
        clients = db.clients();
        console.log(clients.length);
    }
    

    var client = clients[req.body.client];
    if(client === undefined)
        return res.status(404).json({ErrorMessage: "Cliente não encontrado"});

    if(client.token !== req.body.token)
        return res.status(404).json({ErrorMessage: "Token inválido"});
    
    var message={};
    message = {
        client: client,
        phones: req.body.telefones,
        text: req.body.mensagem,
        sent: false
    }
    
    var newDate = new Date();
    var lastDate = new Date(client.lastMessage);
    db.message_insert(message)
        .then((ret) => {
            
            if(newDate.getMonth() !== lastDate.getMonth() || newDate.getFullYear() !== lastDate.getFullYear())
                client.monthMessages = 1;
            else
                client.monthMessages = client.monthMessages+ 1;
            
            client.totalMessages = client.totalMessages+ 1;
            client.lastMessage = newDate.getTime();

            db.client_insert(client)
                .then( ret => console.log(ret))
                .catch( ret => console.log(ret));

            return res.status(200).json(ret.msg);
        })
        .catch((err) => res.status(500).json(err.msg));
});


module.exports = app;