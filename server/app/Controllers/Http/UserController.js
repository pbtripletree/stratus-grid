'use strict'

const User = use('App/Models/User')
const { success, error } = require('../../responses.js')

class UserController {
  async register ({ request, auth, response }) {
    try {
      const user = await User.create(request.all())
      const token = await auth.generate(user)
      Object.assign(user, token)
      return response.status(201).json(
        success(201, 'register success', {
          username: user.username,
          token: user.token
        })
      )
    } catch (e) {
      return response
        .status(400)
        .json(error({ status: 400, message: 'register error' }))
    }
  }

  async login ({ request, auth, response }) {
    const { email, password } = request.all()
    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email)
        const token = await auth.generate(user)
        Object.assign(user, token)
        return response.status(200).json(
          success(200, 'login success', {
            token: user.token,
            username: user.username
          })
        )
      }
    } catch (e) {
      return response
        .status(401)
        .json(error({ status: 401, message: 'login error' }))
    }
  }
}

module.exports = UserController
