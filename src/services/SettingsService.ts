import { SettingsRepository } from "../repositories/SettingsRepository"
import { getCustomRepository } from "typeorm"

interface SettingsCreate {
  username: string
  chat: boolean
}

class SettingsService {
  async create({ chat, username }: SettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const userAlreadyExist = await settingsRepository.findOne({
      username
    })

    if(userAlreadyExist) {
      throw new Error('User already exist!')
    }

    const settings = settingsRepository.create({
      username,
      chat,
    })

    await settingsRepository.save(settings)

    return settings
  }
}

export { SettingsService }
