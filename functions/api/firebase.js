const admin = require('firebase-admin');
admin.initializeApp();
var ref_messages = admin.database().ref('/messages');
var ref_clients = admin.database().ref('/clients');
var db_messages ={};
var db_clients = {};

ref_clients.on('value', 
                snapshot => db_clients = snapshot.val(), 
                errorObject => console.log("Falha de leitura de clientes :" + errorObject.code)
            );

ref_messages.on('value', 
            snapshot => db_messages = snapshot.val(), 
            errorObject => console.log("Falha de leitura de mensagens :" + errorObject.code)
        );


function InsertClient(client){
    return admin.database()
            .ref('/clients/'+client.cpf)
            .set(client)
            .then(() => {
                return {
                    status: 200,
                    msg: {token: client.token}
                };
            })
            .catch((err)=> {
                console.log(err);
                return {
                        status: 500,
                        msg: err    
                    };
            })
}

function InsertMessage(message){
    var channel = '/messages/channel1'; //Quando tiverem varios numeros para enviar mensagem criar lógica aqui.
    return admin.database()
            .ref(channel)
            .push(message)
            .then((snapshot) => {
                return {
                    status: 200,
                    msg: snapshot
                };
            })
            .catch((err)=> {
                console.log(err);
                return {
                    status: 500,
                    msg: err    
                };
            });
}

module.exports = {
    clients: () => db_clients,
    messages: () => db_messages,
    client_insert: InsertClient,
    message_insert: InsertMessage,
}