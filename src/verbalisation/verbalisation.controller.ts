import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerbalisationService } from './verbalisation.service';
import { CreateVerbalisationDto } from './dto/create-verbalisation.dto';
import { UpdateVerbalisationDto } from './dto/update-verbalisation.dto';

@Controller('verbalisation')
export class VerbalisationController {
  constructor(private readonly verbalisationService: VerbalisationService) {}

  @Post()
  create(@Body() createVerbalisationDto: CreateVerbalisationDto) {
    return this.verbalisationService.create(createVerbalisationDto);
  }

  @Get()
  findAll() {
    return this.verbalisationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verbalisationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerbalisationDto: UpdateVerbalisationDto) {
    return this.verbalisationService.update(+id, updateVerbalisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verbalisationService.remove(+id);
  }
}
