let http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const helmet = require('helmet');
require("dotenv-safe").config()
let jwt = require('jsonwebtoken');
const pg = require('./db')

const userServiceProxy = httpProxy('http://localhost:3001');
const productsServiceProxy = httpProxy('http://localhost:3002');

// Proxy request
app.get('/users', verifyJWT, (req, res, next) => {
    console.log(`Cheguei aqui`)
    res.status(200).send({
            message: `Deu certo!`
        })
        //userServiceProxy(req, res, next);
})

app.get('/products', verifyJWT, (req, res, next) => {
    console.log(`Cheguei aqui`)
    res.status(200).send({
            message: `Deu certo!`
        })
        //productsServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);

//authentication
app.post('/login', (req, res, next) => {
    let { username, password } = req.body;

    if (username === 'luiz' && password === '123') {
        //auth ok
        const id = 1; //esse id viria do banco de dados
        let token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 60 // expires in 5min
        });
        res.status(200).send({ auth: true, token: token });
    } else {
        res.status(500).send('Login inválido!');
    }

});

function verifyJWT(req, res, next) {
    let token = req.headers['token'];
    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server API-GATEWAY started on port ${PORT}`)
});