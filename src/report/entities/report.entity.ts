// ReportEntry.ts
import { ReportEntryType } from 'src/common/enum/report.entry';
import { Session } from 'src/session/entities/session.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';


@Entity()
export class ReportEntry extends BaseEntity{
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
@ManyToOne(()=>Session,(se)=>se.reportEntry)
session:Session
  // Add more fields as needed
}
