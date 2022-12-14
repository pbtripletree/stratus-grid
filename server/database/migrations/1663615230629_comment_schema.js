"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CommentSchema extends Schema {
  up() {
    this.create("comments", (table) => {
      table.increments();
      table.timestamps();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable();
      table
        .integer("discussion_id")
        .unsigned()
        .references("id")
        .inTable("discussions")
        .notNullable();
      table.string("text", 200).notNullable();
    });
  }

  down() {
    this.drop("comments");
  }
}

module.exports = CommentSchema;
