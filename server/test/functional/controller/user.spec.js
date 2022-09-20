"use strict";

const { test, trait, before } = use("Test/Suite")("User Controller");

trait("DatabaseTransactions");
trait("Test/ApiClient");

const User = use("App/Models/User");

test("user created", async ({ client, assert }) => {
  assert.plan(3);
  const user = {
    username: "test-user",
    email: "test-user@gmail.com",
    password: "12345678",
  };
  const response = await client.post("/register").send(user).end();
  response.assertStatus(201);
  assert.isNotNull(response.body.body.token);
  assert.equal(response.body.body.username, "test-user");
});

test("user logged in", async ({ client, assert }) => {
  assert.plan(3);
  await User.create({
    username: "test-user",
    email: "test-user@gmail.com",
    password: "12345678",
  });
  const response = await client
    .post("/login")
    .send({ email: "test-user@gmail.com", password: "12345678" })
    .end();
  response.assertStatus(200);
  assert.isNotNull(response.body.body.token);
  assert.equal(response.body.body.username, "test-user");
});
