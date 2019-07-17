const knex = require('../db/database.js');

module.exports = function (app) {
    app.get('/api/FBICrime/states', (req, res) => {
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

    app.get('/api/mobile_os/usage', (req, res) => {
        console.log('get all mobile_os usage');
        knex.select().from("mobile_os_usage")
            .then((response, err) {
                if (err) throw err;
                console.log(response);
                res.json(response);
            }).finally(() => {
                console.log('done');
            })
    })

    app.get('/api/home_sales/sales', (req, res) => {
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

    app.get('/api/aegypti/aegypti', (req, res); => {
        console.log('get all aegypti');
        knex.select().from('aegypti')
            .then((response, err) => {
                if (err) throw err;
                console.log(response);
                res.json(response);
            }).finally(()=> {
                console.log('done)');
            })
    })
}