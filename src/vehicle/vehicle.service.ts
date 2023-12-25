import { CreateAuthDto } from './../auth/dto/create-auth.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, getManager, In } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User)
    private userRepository: Repository<User>,


  ) { }


  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle | User> {
    const { user, ...vehicleData } = createVehicleDto;

    // Check if the user exists
    const userfound = await this.userRepository.findOne({
      where: {
        id: user.id
      }
    });
    if (!userfound) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }

    // Create a new vehicle
    const newVehicle = this.vehicleRepository.create({
      ...vehicleData,
      user,
    });

    // Use transactions for data consistency
    return getManager().transaction(async (transactionalEntityManager) => {
      // Insert the vehicle
      await transactionalEntityManager.insert(Vehicle, newVehicle);

      // Update the user with the new vehicle
      user.vehicles = [newVehicle];
      await transactionalEntityManager.save(User, user);

      return newVehicle;
    });
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }
  async byLicencePlate(licencePlate: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { licensePlate: licencePlate } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with Licence:  ${licencePlate} not found`);
    }
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const existingVehicle = await this.vehicleRepository.findOne({ where: { id } });
    this.vehicleRepository.merge(existingVehicle, updateVehicleDto);
    return await this.vehicleRepository.save(existingVehicle);
  }

  async remove(id: number): Promise<void> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    await this.vehicleRepository.remove(vehicle);
  }
}


