"use strict";

const Discussion = use("App/Models/Discussion");
const Comment = use("App/Models/Comment");

const { success, error } = require("../../responses.js");

class DiscussionController {
  async createDiscussion({ request, auth, response }) {
    try {
      let discussion = await auth.user.discussions().create(request.all());
      await discussion.load("user");
      return response.json(success(201, "discussion created", discussion));
    } catch (e) {
      return response.json(error(500, "create discussion error"));
    }
  }

  async fetchDiscussion({ request, params, response }) {
    try {
      let discussion = await Discussion.find(params.id);
      await discussion.load("user");
      return response.json(success(200, "discussion found", discussion));
    } catch (e) {
      return response.json(error(500, "fetch discussion error"));
    }
  }

  async listDiscussions({ request, response }) {
    try {
      let discussions = await Discussion.query()
        .with("user")
        .orderBy("created_at", "desc")
        .fetch();
      return response.json(success(200, "discussions found", discussions));
    } catch (e) {
      return response.json(error(500, "list discussions error"));
    }
  }

  async createComment({ request, params, auth, response }) {
    try {
      let comment = await auth.user
        .comments()
        .create({ discussion_id: params.id, text: request.body.text });
      await comment.load("user");
      return response.json(success(201, "comment created", comment));
    } catch (e) {
      return response.json(error(500, "create comment error"));
    }
  }

  async listComments({ request, params, response }) {
    try {
      let discussion = await Discussion.find(params.id);
      let comments = await discussion.comments().with("user").fetch();
      return response.json(success(200, "comments found", comments));
    } catch (e) {
      console.log(e);
      return response.json(error(500, "list comments error"));
    }
  }

  async searchDiscussions({ request, params, response }) {
    try {
      const queryData = request.get();
      let discussions = await Discussion.query()
        .whereHas("comments", (builder) => {
          builder.where("text", "like", `%${queryData.query}%`);
        })
        .with("user")
        .fetch();
      return response.json(success(200, "discussions found", discussions));
    } catch (e) {
      return response.json(error(500, "list comments error"));
    }
  }
}

module.exports = DiscussionController;
