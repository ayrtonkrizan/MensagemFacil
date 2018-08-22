'use strict';

const functions = require('firebase-functions');

const db = require('./api/firebase');
//Necessario chamar todos os arquivos para gerar as rotas.
//Achei usar o Routes mais trabalhoso que isso!
const test = require('./api/test');
const mesage = require('./api/message');
const clients = require('./api/clients');



const app = require('./config/server');
exports.api = functions.https.onRequest(app);
