'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {
  user () {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }

  discussion () {
    return this.hasOne('App/Models/Discussion', 'discussion_id', 'id')
  }
}

module.exports = Comment
