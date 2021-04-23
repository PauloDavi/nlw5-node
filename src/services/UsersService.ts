import { getCustomRepository, Repository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import { User } from '../entities/User'

interface UsersCreate {
  email: string
}

class UsersService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create({ email }: UsersCreate) {
    const userAlreadyExist = await this.usersRepository.findOne({
      email,
    })

    if (userAlreadyExist) {
      return userAlreadyExist
    }

    const user = this.usersRepository.create({
      email,
    })

    await this.usersRepository.save(user)

    return user
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      email,
    })

    return user
  }
}

export { UsersService }
