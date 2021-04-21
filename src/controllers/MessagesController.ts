import { Request, Response } from 'express'
import { MessagesService } from '../services/MessagesService '

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, user_id, text } = request.body

    const messagesService = new MessagesService()

    try {
      const settings = await messagesService.create({ admin_id, user_id, text })

      return response.status(201).json(settings)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: error.message,
      })
    }
  }

  async showByUser(request: Request, response: Response) {
    const { user_id } = request.params

    const messagesService = new MessagesService()

    try {
      const list = await messagesService.listByUser(user_id)

      return response.json(list)
    } catch (error) {
      console.log(error)

      return response.status(500).json({
        message: error.message,
      })
    }
  }
}

export { MessagesController }
