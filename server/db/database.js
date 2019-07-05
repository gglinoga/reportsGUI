const options = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'reportsGUI'
    }
};

const knex = require('knex')(options);
console.log('knex connected');



dropTables = () => {
    knex.schema.hasTable('FBICrimeState').then(
        knex.schema.dropTable('FBICrimeState').then(() => {
            console.log('dropped FBICrimeState');
        })
    );
    knex.schema.hasTable('FBICrimeArea').then(
        knex.schema.dropTable('FBICrimeArea').then(() => {
            console.log('dropped FBICrimeArea')
        })
    );
    knex.schema.hasTable('FBICrimeRegion').then(
        knex.schema.dropTable('FBICrimeRegion').then(() => {
            console.log('dropped FBICrimeRegion');
        })
    );
}



module.exports = knex;