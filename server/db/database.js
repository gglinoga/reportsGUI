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
    // knex.schema.hasTable('FBICrimeState').then(
    //     knex.schema.dropTable('FBICrimeState').then(() => {
    //         console.log('dropped FBICrimeState');
    //     })
    // );
    // knex.schema.hasTable('FBICrimeArea').then(
    //     knex.schema.dropTable('FBICrimeArea').then(() => {
    //         console.log('dropped FBICrimeArea')
    //     })
    // );
    // knex.schema.hasTable('FBICrimeRegion').then(
    //     knex.schema.dropTable('FBICrimeRegion').then(() => {
    //         console.log('dropped FBICrimeRegion');
    //     })
    // );
}

createRegion = () => {
    knex.schema.createTable('FBICrimeRegion', table => {
        table.increments('regionID');
        table.string('region');
    }).then((response, err) => {
        if (err) throw err;
        createArea();
    });
}

createArea = () => {
    knex.schema.createTable('FBICrimeArea', table => {
        table.increments('areaID');
        table.string('area');
        table.integer('regionID').unsigned();
        table.foreign('regionID').references('FBICrimeRegion.regionID');
    }).then((response, err) => {
        if (err) throw err;
        createState();
    });
}

createState = () => {
    knex.schema.createTable('FBICrimeState', table => {
        table.increments('stateID');
        table.string('state');
        table.integer('areaID').unsigned();
        table.foreign('areaID').references('FBICrimeArea.areaID');
    }).then((response, err) => {
        if (err) throw err;
        createFBICrimeData();
    });
}

createFBICrimeData = () => {
    knex.schema.createTable('FBICrimeData', table => {
        table.increments('dataID');
        table.integer('stateID').unsigned();
        table.foreign('stateID').references('FBICrimeState.stateID');
        table.integer('year');
        table.integer('population');
        table.integer('violentCrime');
        table.integer('murderManSlaughter');
        table.integer('rapeRevised');
        table.integer('rapeLegacy');
        table.integer('robbery');
        table.integer('aggravatedAssault');
        table.integer('propertyCrime');
        table.integer('larcenyTheft');
        table.integer('gta');
    }).then((response, err) => {
        if (err) throw err;
    })
}

// let start = (err) => {
//     // dropTables();
//     if (err) {
//         console.log(err)
//     } else {
//         createRegion();
//     }
// }

// start();
// createFBICrimeData();


module.exports = knex;