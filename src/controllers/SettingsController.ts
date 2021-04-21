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
}

export { SettingsController }
