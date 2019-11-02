/**
 * Autor: Filipe Firmino Lemos
 * Data: 23/10/2019
 * Contato: filipefirmino@gec.inatel.br
 */

const ControllerService = require("../services/HomeBroker")
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

    async buscar_ativos(req, res) {
        ControllerService.select_actives().then(actives => {
            if (actives.error)
                res.send(actives.message)
            else
                res.send(actives.rows)
        })
    },

    async comprar_ativos(req, res) {
        let { symbol, price, quantity, eletronic_signature, cpf } = req.body;

        let preco_medio = 0,
            preco_pago = parseFloat(price) * parseInt(quantity),
            total_investido = 0;

        ControllerService.buscar_ativo_carteira_variavel(symbol).then(result => {
            //0 -> Não tem salvo na carteira ainda; 1 -> Tem salvo na carteira então deverá só atualizar suas informações
            if (result.rows[0].count == "0") {

                ControllerService.salvar_novo_ativo_carteira_variavel({ symbol, quantity, price, price, preco_pago, cpf }).then(result => {
                    res.send(result.message)
                });

            } else {
                //Buscando informações do ativo para que possa atualizar elas
                ControllerService.buscar_dados_ativo_carteira_variavel({ symbol }).then(result => {
                    let capital = parseFloat(result.rows.total_investido) + parseFloat(preco_pago);
                    let quantidadeTotal = parseInt(quantity) + parseInt(result.rows.quantidade);

                    quantity = quantidadeTotal;
                    preco_medio = capital / quantidadeTotal
                    total_investido = capital

                    //Atualizando informações do ativo na carteira de renda variavel
                    ControllerService.atualizar_dados_ativo_carteira_variavel({ symbol, quantity, preco_medio, total_investido }).then(result => {
                        res.send(result.message)
                    });

                });
            }
        });
    },

    async vender_ativos(req, res) {
        let { symbol, price, quantity, eletronic_signature, cpf } = req.body;

        let preco_medio = 0,
            preco_vendido = parseFloat(price) * parseInt(quantity),
            total_investido = 0;

        ControllerService.buscar_ativo_carteira_variavel(symbol).then(result => {
            //0 -> Não tem salvo na carteira ainda; 1 -> Tem salvo na carteira então deverá só atualizar suas informações
            if (result.rows[0].count == "0")
                res.send({ message: 'Você não tem esse ativo para vendê-lo.' })
            else {
                //Buscando informações do ativo para que possa atualizar elas
                ControllerService.buscar_dados_ativo_carteira_variavel({ symbol }).then(result => {
                    let capital = 0,
                        quantidadeTotal = parseInt(result.rows.quantidade) - parseInt(quantity);

                    if (result.rows.quantidade >= quantity) { //Pode vender o ativo


                        if (quantidadeTotal == 0) { //Deleta o ativo da carteira
                            //Atualizando informações do ativo na carteira de renda variavel
                            ControllerService.deletar_ativo_carteira_variavel({ symbol }).then(result => {
                                res.send(result.message)
                            });
                        } else {
                            capital = parseFloat(result.rows.total_investido) - parseFloat(preco_vendido);

                            quantity = quantidadeTotal;
                            preco_medio = capital / quantidadeTotal
                            total_investido = capital

                            //Atualizando informações do ativo na carteira de renda variavel
                            ControllerService.atualizar_dados_ativo_carteira_variavel({ symbol, quantity, preco_medio, total_investido }).then(result => {
                                res.send(result.message)
                            });
                        }
                    } else
                        res.send({ message: 'Você está tentando vender uma quantidade que não possui.' })
                });
            }
        });
    }
}