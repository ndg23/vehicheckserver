// Control.ts
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Control {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column()
  outcome: string;

  @ManyToOne(() => User, (User) => User.controls)
  user: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.controls)
  vehicle: Vehicle;
}
