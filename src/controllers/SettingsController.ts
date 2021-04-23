import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

class SettingsController {
  async create(request: Request, response: Response) {
    const { username, chat } = request.body

    const settingsService = new SettingsService()

    try {
      const settings = await settingsService.create({ username, chat })

      return response.status(201).json(settings)
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

  async findByUserName(request: Request, response: Response) {
    const { username } = request.params

    const settingsService = new SettingsService()

    try {
      const settings = await settingsService.findByUserName(username)

      return response.status(200).json(settings)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: error.message,
      })
    }
  }

  async update(request: Request, response: Response) {
    const { username } = request.params
    const { chat } = request.body

    const settingsService = new SettingsService()

    try {
      await settingsService.update(username, chat)

      return response.status(204).send()
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: error.message,
      })
    }
  }
}

export { SettingsController }
