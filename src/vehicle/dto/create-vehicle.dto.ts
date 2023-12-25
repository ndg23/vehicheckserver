// create-vehicle.dto.ts
import { IsEnum, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';
import { VehicleType } from 'src/common/enum/vehicle.type';
import { User } from 'src/user/entities/user.entity';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsEnum(VehicleType)
  kind: VehicleType;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
  
  @IsNotEmpty()
  @IsNumber()
  user: User;

  // You can add additional validation decorators as needed
}
