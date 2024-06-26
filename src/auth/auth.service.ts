import { UserPayload } from './entities/payload.entity'

import { CommonOutput } from '@/common/interfaces/output.interface'
import { Role } from '@/common/interfaces/role.interface'
import { UserDto } from '@/users/dto/user.dto'
import { UsersService } from '@/users/users.service'

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): CommonOutput<string> {
    const user = await this.validate(email, password)

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role as Role,
    }

    return this.jwtService.sign(payload)
  }

  async validate(email: string, password: string): CommonOutput<UserDto> {
    const res = await this.usersService.searchAll({ email }, { limit: 1, page: 1 })
    const user = res.data[0]

    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    } else {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND)
    }
  }
}
