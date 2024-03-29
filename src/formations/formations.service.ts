import { CreateFormationDto } from './dto/create-formation.dto'
import { FormationDto } from './dto/formation.dto'
import { SearchFormationDto } from './dto/search-formation.dto'
import { UpdateFormationDto } from './dto/update-formation.dto'
import { PrismaFormationsRepository } from './repositories/formations.repository.prisma'

import { manyIds } from '@helpers/prisma.helper'
import { Output } from '@interfaces/output.interface'

import { Injectable } from '@nestjs/common'

@Injectable()
export class FormationsService {
  constructor(private repository: PrismaFormationsRepository) {}

  findAll(userId: string): Output<FormationDto[]> {
    return this.repository.findAll({ where: { userId } })
  }

  findOne(userId: string, id: string): Output<FormationDto> {
    return this.repository.findOne({ where: { id, userId } })
  }

  searchAll(
    userId: string,
    searchFormationDto: SearchFormationDto,
  ): Output<FormationDto[]> {
    return this.repository.findAll({
      where: {
        ...searchFormationDto,
        ...(searchFormationDto.skills?.length && {
          Skills: { some: { id: searchFormationDto.skills[0] } },
        }),
        userId,
      },
    })
  }

  create(
    userId: string,
    { skills, ...createFormationDto }: CreateFormationDto,
  ): Output<FormationDto> {
    return this.repository.create({
      data: {
        ...createFormationDto,
        ...(skills?.length && {
          Skills: { connect: manyIds(skills) },
        }),
        userId,
      },
    })
  }

  update(
    userId: string,
    id: string,
    updateFormationDto: UpdateFormationDto,
  ): Output<FormationDto> {
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

  addSkills(
    userId: string,
    id: string,
    skills: string[],
  ): Output<FormationDto> {
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
  ): Output<FormationDto> {
    return this.repository.update({
      where: { userId, id },
      include: { Skills: true },
      data: {
        Skills: { disconnect: manyIds(skills) },
      },
    })
  }

  remove(userId: string, id: string): Output<FormationDto> {
    return this.repository.remove({ where: { userId, id } })
  }
}
