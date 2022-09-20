"use strict";

const { test, trait, before } = use("Test/Suite")("Auth");

trait("DatabaseTransactions");
trait("Test/ApiClient");

const Discussion = use("App/Models/Discussion");
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

test("cannot create discussion without token", async ({ client, assert }) => {
  assert.plan(1);
  const response = await client
    .post("/discussions")
    .send({ title: "no auth" })
    .end();
  response.assertStatus(401);
});

test("cannot create comment without token", async ({ client, assert }) => {
  assert.plan(1);
  const user = await createUser();
  const discussion = await createDiscussion(user);
  const response = await client
    .post(`/discussions/${discussion.id}/comments`)
    .send({ text: "no auth" })
    .end();
  response.assertStatus(401);
});
