import { Injectable } from '@nestjs/common';
import { CreateVerbalisationDto } from './dto/create-verbalisation.dto';
import { UpdateVerbalisationDto } from './dto/update-verbalisation.dto';

@Injectable()
export class VerbalisationService {
  create(createVerbalisationDto: CreateVerbalisationDto) {
    return 'This action adds a new verbalisation';
  }

  findAll() {
    return `This action returns all verbalisation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verbalisation`;
  }

  update(id: number, updateVerbalisationDto: UpdateVerbalisationDto) {
    return `This action updates a #${id} verbalisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} verbalisation`;
  }
}
