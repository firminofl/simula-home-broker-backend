/**
 * Autor: Filipe Firmino Lemos
 * Data: 23/10/2019
 * Contato: filipefirmino@gec.inatel.br
 */

const express = require('express');
const GlobalMessages = require('./controllers/GlobalMessages');

//Iniciando o app
const app = express();
app.use(express.json());

//Rota de inicializacao do servidor
app.use('/', require("./routes/routes"));

//Definindo porta em que subiremos o servidor
let PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server consulta-cotacoes started on port ${PORT}`)
})