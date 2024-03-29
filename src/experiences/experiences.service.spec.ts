import { ExperiencesService } from './experiences.service'
import { PrismaExperiencesRepository } from './repositories/experiences.repository.prisma'

import { PrismaService } from '@prisma/prisma.service'

import { Test, TestingModule } from '@nestjs/testing'

describe('ExperiencesService', () => {
  let service: ExperiencesService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperiencesService,
        PrismaExperiencesRepository,
        PrismaService,
      ],
    }).compile()

    service = module.get<ExperiencesService>(ExperiencesService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(prisma).toBeDefined()
  })
})
