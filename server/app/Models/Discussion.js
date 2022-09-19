"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Discussion extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  comments() {
    return this.hasMany("App/Models/Comment", "id", "discussion_id");
  }
}

module.exports = Discussion;
