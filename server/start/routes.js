"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

// status
Route.get("/health", () => ({
  status: "UP",
}));

// user
Route.post("/register", "UserController.register");
Route.post("/login", "UserController.login");

//discussion
Route.get("/discussions", "DiscussionController.listDiscussions");
Route.get("/discussions/:id", "DiscussionController.fetchDiscussion");
Route.get("/discussions/search", "DiscussionController.searchDiscussions");
Route.get("/discussions/:id/comments", "DiscussionController.listComments");
Route.post("/discussions", "DiscussionController.createDiscussion").middleware(
  "auth"
);
Route.post(
  "/discussions/:id/comments",
  "DiscussionController.createComment"
).middleware("auth");
