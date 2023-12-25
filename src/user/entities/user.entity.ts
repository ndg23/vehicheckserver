// user.entity.ts
import { Control } from 'src/control/entities/control.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Verbalisation } from 'src/verbalisation/entities/verbalisation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() =>Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];
  
  @OneToMany(() =>Verbalisation, (verbalisation) => verbalisation.user)
  verbalisations: [];
  
  @OneToMany(() => Control, (control) => control.user)
  controls: Control[];
}
