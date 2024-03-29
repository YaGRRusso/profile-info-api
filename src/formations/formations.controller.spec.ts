import { FormationsController } from '../formations/formations.controller'
import { FormationsService } from '../formations/formations.service'
import { PrismaFormationsRepository } from '../formations/repositories/formations.repository.prisma'

import { PrismaService } from '@prisma/prisma.service'

import { Test, TestingModule } from '@nestjs/testing'

describe('FormationsController', () => {
  let controller: FormationsController
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationsController],
      providers: [FormationsService, PrismaFormationsRepository, PrismaService],
    }).compile()

    controller = module.get<FormationsController>(FormationsController)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(prisma).toBeDefined()
  })
})
