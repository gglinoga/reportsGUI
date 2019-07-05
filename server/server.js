const knex = require('./db/database');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log("app listening on PORT " + PORT);
});