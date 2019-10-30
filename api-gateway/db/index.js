const { Client } = require('pg')
const PORT = 3000

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'shb',
    password: 'sml3uc0',
    port: 5432,
})

client.connect((err) => {
    if (err) {
        console.log(`***********************************`);
        console.error(`* Database connection error *\n\n ${err.stack}`);
        console.log("*******************************");
        client.end();
    } else {
        console.log(`***********************************`);
        console.log(`* SHB started on port: ${PORT}       *\n* Database: ${client.database} is connected      *`)
        console.log(`***********************************\n\n`);
    }
})

module.exports = {
    query: (text, values, callback) => {
        return client.query(text, values, callback)
    },
    queryAsync: (text, values) => client.query(text, values)
}