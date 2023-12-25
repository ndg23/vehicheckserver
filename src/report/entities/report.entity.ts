// ReportEntry.ts
import { ReportEntryType } from 'src/common/enum/report.entry';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class ReportEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({
    type: 'enum',
    enum: ReportEntryType,
  })
  kind: ReportEntryType;

  @Column()
  description: string;


  @ManyToOne(() => Vehicle, (vehicle) => vehicle.reportEntries)
  vehicle: Vehicle;

  // Additional fields
  @Column({ nullable: true })
  location: string;

  // Add more fields as needed
}
