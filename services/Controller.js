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
            query = `INSERT INTO public.homebroker(ativo, ultnegocio, precomin, precoabertura, precomax, volume) 
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
            query = `SELECT * FROM public.homebroker;`

            var { rows } = await pg.query(query)
            return { error: false, rows };

        } catch (error) {
            return { error: true, message: message.ERROR_SELECT_ACTIVES };
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