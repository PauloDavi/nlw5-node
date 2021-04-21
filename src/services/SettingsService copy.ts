import { getCustomRepository, Repository } from 'typeorm'
import { SettingsRepository } from '../repositories/SettingsRepository'
import { Setting } from '../entities/Setting'

interface IsSettingsCreate {
  username: string
  chat: boolean
}

class SettingsService {
  private settingsRepository: Repository<Setting>

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository)
  }

  async create({ chat, username }: IsSettingsCreate) {
    const userAlreadyExist = await this.settingsRepository.findOne({
      username,
    })

    if (userAlreadyExist) {
      throw new Error('User already exist!')
    }

    const settings = this.settingsRepository.create({
      username,
      chat,
    })

    await this.settingsRepository.save(settings)

    return settings
  }
}

export { SettingsService }
