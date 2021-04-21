import { getCustomRepository, Repository } from 'typeorm'
import { MessagesRepository } from '../repositories/MessagesRepository'
import { Message } from '../entities/Message'

interface MessagesCreate {
  text: string
  user_id: string
  admin_id?: string
}

class MessagesService {
  private messagesRepository: Repository<Message>

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository)
  }

  async create({ admin_id, text, user_id }: MessagesCreate) {
    const message = this.messagesRepository.create({
      text,
      user_id,
      admin_id,
    })

    await this.messagesRepository.save(message)

    return message
  }

  async listByUser(user_id: string) {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ['user'],
    })

    return list
  }
}

export { MessagesService }
