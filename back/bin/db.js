const { Model } = require('objection');

const knex = require('knex')({
  client: 'mysql',
  version: '5.7',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_SCHEMA
  }
});

Model.knex(knex);

// module.exports = Model.knex(knex);
