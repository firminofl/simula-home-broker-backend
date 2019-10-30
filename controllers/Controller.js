/**
 * Autor: Filipe Firmino Lemos
 * Data: 23/10/2019
 * Contato: filipefirmino@gec.inatel.br
 */

const ControllerService = require("../services/Controller")
const TreatmentActive = require('./TreatmentInfoActive')
let { API_KEY, IMMUTABLE_URL, TYPE, UNABLE_TO_FIND_SERVER } = require('./GlobalMessages')

let request = require('request')

module.exports = {
    async buscar_cotacoes(req, res) {
        //Obtendo o código do ativo que deseja as informações
        let { symbol } = req.body;

        //URL para busca externa a API fornecida pelo site mencionado acima
        let URL = `${IMMUTABLE_URL}${TYPE[0]}&symbol=${symbol}.SA&apikey=${API_KEY}`

        //Abertura de uma requisição externa para obtenção das informações globais de uma ação
        request.get(URL, (error, response) => {
            if (!error) {
                //Utilizando de um modelo que será reaproveitado em outras partes do código
                let active = TreatmentActive.treatmentActive(response.body, symbol)

                ControllerService.insert_active(active).then(status => {
                    if (status.error)
                        res.status(500).send(status.message)
                    else
                        res.redirect('/buscar-ativos')
                })

            } else if (error) {
                //Caso tenha ocorrido erro ou time-out na requisição
                res.status(404).send({
                    error: UNABLE_TO_FIND_SERVER
                });
            }
        });
    },

    async select_actives(req, res) {
        ControllerService.select_actives().then(actives => {
            if (actives.error)
                res.send(actives.message)
            else
                res.send(actives.rows)
        })
    }
}