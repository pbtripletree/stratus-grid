"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DiscussionSchema extends Schema {
  up() {
    this.create("discussions", (table) => {
      table.increments();
      table.timestamps();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.string("title", 80).notNullable();
    });
  }

  down() {
    this.drop("discussions");
  }
}

module.exports = DiscussionSchema;
