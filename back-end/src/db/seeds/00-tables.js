const tables = require("./00-tables.json");

exports.seed = function (knex) {
  // return knex
  //  .raw ('TRUNCATE TABLE tables RESTART IDENTITY CASCADE')
  return knex("tables")
    .del()
    .then (function () {
      // Inserts seed entries
      return knex ('tables').insert (tables);
    });
};
