const reservations = require("./00-reservations.json");

exports.seed = function (knex) {
   return knex
    .raw ('TRUNCATE TABLE reservations RESTART IDENTITY CASCADE')
  // return knex("reservations")
  //  .del()
    .then (function () {
      // Inserts seed entries
      return knex ('reservations').insert (reservations);
    });
};
