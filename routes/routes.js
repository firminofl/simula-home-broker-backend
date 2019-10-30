/**
 * Autor: Filipe Firmino Lemos
 * Data: 23/10/2019
 * Contato: filipefirmino@gec.inatel.br
 */

const express = require('express');
const routes = express.Router();

const Controller = require('../controllers/Controller.js');

routes.post('/buscar-cotacoes', Controller.buscar_cotacoes);

routes.get('/buscar-ativos', Controller.select_actives);

module.exports = routes;