/**
 * Autor: Filipe Firmino Lemos
 * Data: 22/10/2019
 * Contato: filipefirmino@gec.inatel.br
 */

const pg = require('../dao/Index');
const message = require('../controllers/GlobalMessages')

module.exports = {
    async insert_active(active) {
        //metodo
        let query = ''
            // await doRequest(true)
            //     .then(response => {
            //         console.log(`Rota index (services)! | Atributo: ${obj}`)
            //     })

        if (active === undefined)
            return { error: true, message: message.REQUEST_TO_SERVER_FAILED }

        try {
            query = `INSERT INTO public.homebroker(ativo, ultimo_negocio, preco_minimo, preco_abertura, preco_maximo, volume) 
            VALUES ('${active['symbol']}', ${active['price']}, ${active['low']}, ${active['open']}, ${active['high']}, ${active['volume']});`

            await pg.queryAsync(query)

            return { error: false, message: message.SUCCESS_SAVE_DATABASE };
        } catch (error) {

            if (error.detail !== undefined) {
                if (error.detail.indexOf('already exits'))
                    return { error: true, message: message.ACTIVE_EXITS_DATABASE };
                else
                    return { error: true, message: detail };
            } else
                return { error: true, message: message.ERROR_SELECT_ACTIVES };
        }

    },

    async select_actives() {
        let query = ''

        try {
            query = `SELECT * FROM homebroker;`

            var { rows } = await pg.query(query)
            return { error: false, rows };

        } catch (error) {
            return { error: true, message: message.ERROR_SELECT_ACTIVES };
        }
    },

    async buscar_ativo_carteira_variavel(symbol) {
        let query = ''

        try {
            query = `SELECT COUNT(*) FROM carteira_variavel WHERE papel = '${symbol}';`

            var { rows } = await pg.query(query)

            return { error: false, rows };

        } catch (error) {
            return { error: true, message: message.ERROR_SELECT_ACTIVES };
        }
    },

    async salvar_novo_ativo_carteira_variavel(active) {
        let query = '';

        try {
            query = `INSERT INTO carteira_variavel( papel, quantidade, preco_medio, valor_pago, total_investido, cpf_usuario_fk) 
            VALUES ('${active['symbol']}', ${active['quantity']}, ${active['price']}, ${active['price']}, ${active['preco_pago']}, '${active['cpf']}');`
            console.log(query)
            pg.queryAsync(query)

            return { error: false, message: message.SUCCESS_SAVE_ACTIVE_CARTEIRA_VARIAVEL };

        } catch (error) {
            return { error: true, message: message.ERROR_SELECT_ACTIVES };
        }
    },

    async buscar_dados_ativo_carteira_variavel(active) {
        let query = ''

        try {
            query = `SELECT * FROM carteira_variavel WHERE papel = '${active['symbol']}';`

            var { rows } = await pg.query(query)
            return { error: false, rows: rows[0] };

        } catch (error) {
            return { error: true, message: message.ERROR_SELECT_ACTIVES };
        }
    },

    async atualizar_dados_ativo_carteira_variavel(active) {
        let query = ''

        try {
            query = `UPDATE carteira_variavel SET quantidade = ${active['quantity']}, preco_medio = ${active['preco_medio']}, valor_pago = ${active['preco_medio']}, total_investido = ${active['total_investido']}
             WHERE papel = '${active['symbol']}';`

            await pg.queryAsync(query)

            return { error: false, message: message.SUCCESS_UPDATE_ACTIVE_CARTEIRA_VARIAVEL };

        } catch (error) {
            return { error: true, message: message.ERROR_UPDATE_ACTIVE_CARTEIRA_VARIAVEL };
        }
    }
}

function doRequest(resolver) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!resolver) {
                // rejeitá-la
                reject("Reject Promise!")
            }
            resolve({
                id: 1,
                nome: "Teste"
            });
        }, 5000);
    });
}