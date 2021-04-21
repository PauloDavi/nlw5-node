import { Request, Response } from 'express'
import { UsersService } from '../services/UsersService'

class UsersController {
  async create(request: Request, response: Response) {
    const { email } = request.body

    const usersService = new UsersService()

    try {
      const user = await usersService.create({ email })

      return response.status(201).json(user)
    } catch (error) {
      console.log(error)

      if (error.message === 'User already exist!') {
        return response.status(400).json({
          message: error.message,
        })
      }

      return response.status(500).json({
        message: error.message,
      })
    }
  }
}

export { UsersController }
