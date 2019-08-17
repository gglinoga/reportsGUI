const knex = require('../db/database.js');

module.exports = function (app) {
    app.get('/api/FBICrimestate', (req, res) => {
        console.log('get all states');
        knex.select().from("FBICrimeState")
            .then((response, err) => {
                if (err) throw err;
                console.log(response);
                res.json(response);
            }).finally(() => {
                console.log('done');
            })
    })

    app.get('/api/death', (req, res) => {
        console.log('get all cause of death');
        knex.select().from('death')
            .then((response, err) => {
                if (err) throw err;
                console.log(response);
                res.json(response)
            })
            .finally(() => {
                console.log('done')
            })
    })

    app.get('/api/mobile_os_usage', (req, res) => {
        console.log('get all mobile_os usage');
        knex.select().from("mobile_os_usage")
            .then((response, err) => {
                if (err) throw err;
                console.log(response);
                res.json(response);
            }).finally(() => {
                console.log('done');
            })
    })

    app.get('/api/home_sales', (req, res) => {
        console.log('get all home sales');
        knex.select().from('home_sales')
            .then((response, err) => {
                if (err) throw err;
                console.log(response);
                res.json(response);
            }).finally(() => {
                console.log('done');
            })
    })

    app.get('/api/aegypti', (req, res) => {
        console.log('get all aegypti');
        knex.select().from('aegypti').groupBy('COUNTRY')
            .then((response, err) => {
                if (err) throw err;
                console.log(response);
                res.json(response);
            }).finally(()=> {
                console.log('done)');
            })
    })

    app.get('/api/theaters', (req, res) => {
        console.log('get all theaters')
    })
}