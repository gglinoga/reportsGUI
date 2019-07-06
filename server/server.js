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

app.get('/api/FBICrime/states', (req, res) => {
    console.log('get all states');
    knex.select().from('FBICrimeState')
    .then(function (response,err){
        if(err) throw err;
        console.log(response);
        res.json(response);
    }).finally(() => {
        console.log('done');
    })
})