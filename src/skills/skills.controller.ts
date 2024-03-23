import { CreateSkillDto } from './dto/create-skill.dto'
import { SearchSkillDto } from './dto/search-skill.dto'
import { SkillDto } from './dto/skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'
import { SkillsService } from './skills.service'

import { AuthRequest } from '@auth/entities/request.entity'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @ApiHeader({ name: 'Authorization' })
  @ApiResponse({ type: SkillDto, isArray: true })
  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.skillsService.findAll(req.user.id)
  }

  @ApiHeader({ name: 'Authorization' })
  @ApiResponse({ type: SkillDto })
  @Get(':id')
  findOne(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.skillsService.findOne(req.user.id, id)
  }

  @ApiHeader({ name: 'Authorization' })
  @ApiResponse({ type: SkillDto, isArray: true })
  @Get('search')
  searchAll(@Req() req: AuthRequest, @Body() searchSkillDto: SearchSkillDto) {
    return this.skillsService.searchAll(req.user.id, searchSkillDto)
  }

  @ApiHeader({ name: 'Authorization' })
  @ApiResponse({ type: SkillDto })
  @Post()
  create(@Req() req: AuthRequest, @Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(req.user.id, createSkillDto)
  }

  @ApiHeader({ name: 'Authorization' })
  @ApiResponse({ type: SkillDto })
  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillsService.update(req.user.id, id, updateSkillDto)
  }

  @ApiHeader({ name: 'Authorization' })
  @ApiResponse({ type: SkillDto })
  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.skillsService.remove(req.user.id, id)
  }
}
