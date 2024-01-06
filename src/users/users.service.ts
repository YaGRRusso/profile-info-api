import { Injectable } from '@nestjs/common'
import { PrismaUsersRepository } from './repositories/users.repository.prisma'
import { Output } from 'src/common/interfaces/output.interface'
import { User } from './entities/user.entity'
import { SearchUserDto } from './dto/search-user.dto'

@Injectable()
export class UsersService {
  constructor(private repository: PrismaUsersRepository) {}

  async findAll(): Output<User[]> {
    return await this.repository.findAll()
  }

  async findOne(id: string): Output<User> {
    return await this.repository.findOne(id)
  }

  async searchAll(searchUserDto: SearchUserDto): Output<User[]> {
    return await this.repository.findAll({ where: searchUserDto })
  }

  async create(data: Partial<User>): Output<User> {
    return await this.repository.create(data)
  }

  async update(id: string, data: Partial<User>): Output<User> {
    return await this.repository.update(id, data)
  }

  async remove(id: string): Output<User> {
    return await this.repository.remove(id)
  }
}
