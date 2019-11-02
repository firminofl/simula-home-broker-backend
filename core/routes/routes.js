/**
 * Autor: Filipe Firmino Lemos
 * Data: 23/10/2019
 * Contato: filipefirmino@gec.inatel.br
 */

const express = require('express');
const routes = express.Router();

const Controller = require('../controllers/HomeBroker.js');

routes.post('/buscar-cotacoes', Controller.buscar_cotacoes);

routes.get('/buscar-ativos', Controller.buscar_ativos);

routes.post('/comprar-ativo', Controller.comprar_ativos);

routes.post('/vender-ativo', Controller.vender_ativos);

module.exports = routes;