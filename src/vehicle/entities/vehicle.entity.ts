// Vehicle.ts
import { VehicleType } from 'src/common/enum/vehicle.type';
// import { Control } from 'src/control/entities/control.entity';
import { ReportEntry } from 'src/report/entities/report.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    licensePlate: string;

    @Column()
    model: string;

    @Column()
    brand: string;

    @Column({
        type: 'enum',
        enum: VehicleType,
        default: VehicleType.CAR,
    })
    kind: VehicleType;

    @Column()
    color: string;

    @Column()
    year: number;
    @ManyToOne(() => User, (user) => user.vehicles)
    user: User
    @OneToMany(() => ReportEntry, (report) => report.vehicle)
    reportEntries: ReportEntry[];
    
     // Getter method to get the English representation of the vehicle type
  getType(): string {
    return Object.keys(VehicleType).find(key => VehicleType[key] === this.kind) || '';
  }
}
