const express = require('express');
const server = express();
const PORT = 3000;
const pg = require('pg');
const pgString = process.env['DATABASE_URL'];


const con = pg.connect(pgString);

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
server.get('/', (req, res) => res.status(200).send('Hello World!!'));