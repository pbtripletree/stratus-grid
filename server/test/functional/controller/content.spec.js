"use strict";

const { test, trait, before } = use("Test/Suite")("Content Controller");

trait("DatabaseTransactions");
trait("Test/ApiClient");
trait("Auth/Client");

const Discussion = use("App/Models/Discussion");
const Comment = use("App/Models/Comment");
const User = use("App/Models/User");

const createUser = async () =>
  await User.create({
    email: "test-user@gmail.com",
    username: "test-user",
    password: "12345678",
  });

const createDiscussion = async (user) =>
  Discussion.create({
    user_id: user.id,
    title: "test discussion",
  });

test("discussion created", async ({ client, assert }) => {
  assert.plan(2);
  let user = await createUser();
  const response = await client
    .post("/discussions")
    .loginVia(user)
    .send({ title: "test discussion" })
    .end();
  response.assertStatus(201);
  response.assertJSONSubset({
    body: {
      title: "test discussion",
      user: {
        username: "test-user",
      },
    },
  });
});

test("discussion found", async ({ client, assert }) => {
  assert.plan(2);
  let user = await createUser();
  const discussion = await createDiscussion(user);
  const response = await client.get(`/discussions/${discussion.id}`).end();
  response.assertStatus(200);
  response.assertJSONSubset({
    body: {
      id: discussion.id,
    },
  });
});

test("comment created", async ({ client, assert }) => {
  assert.plan(2);
  let user = await createUser();
  const discussion = await createDiscussion(user);
  const response = await client
    .post(`/discussions/${discussion.id}/comments`)
    .loginVia(user)
    .send({ text: "comment" })
    .end();
  response.assertStatus(201);
  response.assertJSONSubset({
    body: {
      discussion_id: discussion.id.toString(),
      text: "comment",
      user: {
        username: "test-user",
      },
    },
  });
});

test("comments listed", async ({ client, assert }) => {
  assert.plan(2);
  let user = await createUser();
  const discussion = await createDiscussion(user);
  const comment = await Comment.create({
    discussion_id: discussion.id,
    user_id: user.id,
    text: "comment",
  });
  const response = await client
    .get(`/discussions/${discussion.id}/comments`)
    .end();
  response.assertStatus(200);
  response.assertJSONSubset({
    body: [
      {
        id: comment.id,
        text: "comment",
        user: {
          username: "test-user",
        },
      },
    ],
  });
});

test("discussions listed", async ({ client, assert }) => {
  assert.plan(2);
  let user = await createUser();
  const discussion = await createDiscussion(user);
  const response = await client.get(`/discussions`).end();
  response.assertStatus(200);
  response.assertJSONSubset({
    body: [
      {
        id: discussion.id,
      },
    ],
  });
});

test("discussions searched", async ({ client, assert }) => {
  assert.plan(3);
  let user = await createUser();
  const discussion = await createDiscussion(user);
  const discussion2 = Discussion.create({
    user_id: user.id,
    title: "another test",
  });
  await Comment.create({
    user_id: user.id,
    discussion_id: discussion.id,
    text: "this",
  });
  await Comment.create({
    user_id: user.id,
    discussion_id: discussion2.id,
    text: "not that",
  });
  const response = await client.get(`/search/discussions?query=this`).end();
  response.assertStatus(200);
  response.assertJSONSubset({
    body: [
      {
        id: discussion.id,
      },
    ],
  });
  assert.equal(response.body.body.length, 1);
});
