"use strict";

const User = use("App/Models/User");
const { success, error } = require("../../responses.js");

class UserController {
  async register({ request, auth, response }) {
    try {
      let user = await User.create(request.all());
      let token = await auth.generate(user);
      Object.assign(user, token);
      return response.json(
        success(201, "register success", {
          username: user.username,
          token: user.token,
        })
      );
    } catch (e) {
      return response.json(error({ status: 400, message: "register error" }));
    }
  }

  async login({ request, auth, response }) {
    let { email, password } = request.all();
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy("email", email);
        let token = await auth.generate(user);
        Object.assign(user, token);
        return response.json(
          success(200, "login success", {
            token: user.token,
            username: user.username,
          })
        );
      }
    } catch (e) {
      return response.json(error({ status: 401, message: "login error" }));
    }
  }
}

module.exports = UserController;
