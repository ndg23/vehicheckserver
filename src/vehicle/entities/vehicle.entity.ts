// Vehicle.ts
import { VehicleType } from 'src/common/enum/vehicle.type';
import { Control } from 'src/control/entities/control.entity';
import { ReportEntry } from 'src/report/entities/report.entity';
import { User } from 'src/user/entities/user.entity';
import { Verbalisation } from 'src/verbalisation/entities/verbalisation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Vehicle {
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
    @OneToMany(() => Control, (control) => control.vehicle)
    controls: Control[];
    @OneToMany(() => ReportEntry, (report) => report.vehicle)
    reportEntries: ReportEntry[];
    
    @OneToMany(() => Verbalisation, (verbalisations) => verbalisations.vehicle)
    verbalisations: Verbalisation[];

     // Getter method to get the English representation of the vehicle type
  getType(): string {
    return Object.keys(VehicleType).find(key => VehicleType[key] === this.kind) || '';
  }
}
