'use strict'

const Discussion = use('App/Models/Discussion')

const { success, error } = require('../../responses.js')

class ContentController {
  async createDiscussion ({ request, auth, response }) {
    try {
      const discussion = await auth.user.discussions().create(request.all())
      await discussion.load('user')
      return response
        .status(201)
        .json(success(201, 'discussion created', discussion))
    } catch (e) {
      return response.status(500).json(error(500, 'create discussion error'))
    }
  }

  async fetchDiscussion ({ request, params, response }) {
    try {
      const discussion = await Discussion.find(params.id)
      await discussion.load('user')
      return response
        .status(200)
        .json(success(200, 'discussion found', discussion))
    } catch (e) {
      return response.status(500).json(error(500, 'fetch discussion error'))
    }
  }

  async listDiscussions ({ request, response }) {
    try {
      const discussions = await Discussion.query()
        .with('user')
        .orderBy('created_at', 'desc')
        .fetch()
      return response
        .status(200)
        .json(success(200, 'discussions found', discussions))
    } catch (e) {
      return response.status(500).json(error(500, 'list discussions error'))
    }
  }

  async createComment ({ request, params, auth, response }) {
    try {
      const comment = await auth.user
        .comments()
        .create({ discussion_id: params.id, text: request.body.text })
      await comment.load('user')
      return response
        .status(201)
        .json(success(201, 'comment created', comment))
    } catch (e) {
      return response.status(500).json(error(500, 'create comment error'))
    }
  }

  async listComments ({ request, params, response }) {
    try {
      const discussion = await Discussion.find(params.id)
      const comments = await discussion.comments().with('user').fetch()
      return response
        .status(200)
        .json(success(200, 'comments found', comments))
    } catch (e) {
      return response.status(500).json(error(500, 'list comments error'))
    }
  }

  async searchDiscussions ({ request, params, response }) {
    try {
      const queryData = request.get()
      const discussions = await Discussion.query()
        .whereHas('comments', (builder) => {
          builder.where('text', 'like', `%${queryData.query}%`)
        })
        .with('user')
        .orderBy('created_at', 'desc')
        .fetch()
      return response
        .status(200)
        .json(success(200, 'discussions found', discussions))
    } catch (e) {
      return response.status(500).json(error(500, 'list discussions error'))
    }
  }
}

module.exports = ContentController
