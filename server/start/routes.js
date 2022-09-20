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
Route.get("/discussions", "ContentController.listDiscussions");
Route.get("/discussions/:id", "ContentController.fetchDiscussion");
Route.get("/search/discussions", "ContentController.searchDiscussions");
Route.get("/discussions/:id/comments", "ContentController.listComments");
Route.post("/discussions", "ContentController.createDiscussion").middleware(
  "auth"
);
Route.post(
  "/discussions/:id/comments",
  "ContentController.createComment"
).middleware("auth");
