import { Injectable } from '@nestjs/common'
import { PrismaFormationsRepository } from './repositories/formations.repository.prisma'
import { Formation } from './entities/formation.entity'
import { Output } from '@interfaces/output.interface'
import { manyIds } from '@helpers/prisma.helper'
import { CreateFormationDto } from './dto/create-formation.dto'
import { SearchFormationDto } from './dto/search-formation.dto'
import { UpdateFormationDto } from './dto/update-formation.dto'

@Injectable()
export class FormationsService {
  constructor(private repository: PrismaFormationsRepository) {}

  findAll(): Output<Formation[]> {
    return this.repository.findAll()
  }

  findOne(id: string): Output<Formation> {
    return this.repository.findOne({ where: { id } })
  }

  searchAll(searchFormationDto: SearchFormationDto): Output<Formation[]> {
    return this.repository.findAll({
      where: {
        ...searchFormationDto,
        ...(searchFormationDto.skills?.length && {
          Skills: { some: { id: searchFormationDto.skills[0] } },
        }),
      },
    })
  }

  create(
    userId: string,
    { skills, ...createFormationDto }: CreateFormationDto,
  ): Output<Formation> {
    return this.repository.create({
      data: {
        userId,
        ...createFormationDto,
        ...(skills?.length && {
          Skills: { connect: manyIds(skills) },
        }),
      },
    })
  }

  update(
    userId: string,
    id: string,
    updateFormationDto: UpdateFormationDto,
  ): Output<Formation> {
    return this.repository.update({
      where: { id, userId },
      data: {
        ...updateFormationDto,
        ...(updateFormationDto.skills && {
          Skills: { set: [], connect: manyIds(updateFormationDto.skills) },
        }),
      },
    })
  }

  addSkills(userId: string, id: string, skills: string[]): Output<Formation> {
    return this.repository.update({
      where: { userId, id },
      include: { Skills: true },
      data: {
        Skills: { connect: manyIds(skills) },
      },
    })
  }

  removeSkills(
    userId: string,
    id: string,
    skills: string[],
  ): Output<Formation> {
    return this.repository.update({
      where: { userId, id },
      include: { Skills: true },
      data: {
        Skills: { disconnect: manyIds(skills) },
      },
    })
  }

  remove(userId: string, id: string): Output<Formation> {
    return this.repository.remove({ where: { userId, id } })
  }
}