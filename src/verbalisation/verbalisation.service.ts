import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVerbalisationDto } from './dto/create-verbalisation.dto';
import { UpdateVerbalisationDto } from './dto/update-verbalisation.dto';
import { Verbalisation } from './entities/verbalisation.entity';

@Injectable()
export class VerbalisationService {
  constructor(
    @InjectRepository(Verbalisation)
    private verbalisationRepository: Repository<Verbalisation>,
  ) {}

  async create(createVerbalisationDto: CreateVerbalisationDto): Promise<Verbalisation> {
    const newVerbalisation = this.verbalisationRepository.create(createVerbalisationDto);
    return await this.verbalisationRepository.save(newVerbalisation);
  }

  async findAll(): Promise<Verbalisation[]> {
    return await this.verbalisationRepository.find();
  }

  async findOne(id: number): Promise<Verbalisation> {
    const verbalisation = await this.verbalisationRepository.findOne({where:{id}});
    if (!verbalisation) {
      throw new NotFoundException(`Verbalisation with ID ${id} not found`);
    }
    return verbalisation;
  }

  async update(id: number, updateVerbalisationDto: UpdateVerbalisationDto): Promise<Verbalisation> {
    const existingVerbalisation = await this.verbalisationRepository.findOne({where:{id}});
    this.verbalisationRepository.merge(existingVerbalisation, updateVerbalisationDto);
    return await this.verbalisationRepository.save(existingVerbalisation);
  }

  async remove(id: number): Promise<void> {
    const verbalisation = await this.verbalisationRepository.findOne({where:{id}});
    await this.verbalisationRepository.remove(verbalisation);
  }
}
