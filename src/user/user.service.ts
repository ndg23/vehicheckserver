import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where:{id}});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async findBy(text:string): Promise<User> {
    const user = await this.userRepository.findOne({where:{email:text}});
    if (!user) {
      throw new NotFoundException(`User with ID ${text} not found`);
    }
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({where:{id}});
    this.userRepository.merge(existingUser, updateUserDto);
    return await this.userRepository.save(existingUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({where:{id}});
    await this.userRepository.remove(user);
  }
}
