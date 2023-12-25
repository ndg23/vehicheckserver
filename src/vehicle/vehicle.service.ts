import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const newVehicle = this.vehicleRepository.create(createVehicleDto);
    return await this.vehicleRepository.save(newVehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({where:{id}});
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }
  async byLicencePlate(licencePlate: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({where:{licensePlate:licencePlate}});
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with Licence:  ${licencePlate} not found`);
    }
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findOne({where:{id}});
    this.vehicleRepository.merge(existingVehicle, updateVehicleDto);
    return await this.vehicleRepository.save(existingVehicle);
  }

  async remove(id: number): Promise<void> {
    const vehicle = await this.vehicleRepository.findOne({where:{id}});
    await this.vehicleRepository.remove(vehicle);
  }
}


