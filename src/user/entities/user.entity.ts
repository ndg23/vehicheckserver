// user.entity.ts
import { UserSexe } from 'src/common/enum/sexe.type';
import { UserRole } from 'src/common/enum/user.role';
// import { Control } from 'src/control/entities/control.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';


const toLowerCase = {
    to: (entityValue: string) => entityValue.toLowerCase(),
    from: (databaseValue: string) => databaseValue,
};

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;
    @Column()
    phone: string;
    @Column({
        type: "varchar",
        unique: true,
        transformer: toLowerCase,
    })
    email: string;
    @Column()
    nationality: string;
    @Column()
    birth: string;
    @Column()
    card_type: string;
    @Column({
        type: "varchar",
        transformer: toLowerCase,

    })
    profession: string;
    @Column({
        type: 'enum',
        enum: UserSexe,
        default: UserSexe.MALE,
    })
    sexe: UserSexe;
    @Column({
        type: "varchar"
    })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.DRIVER,
    })
    role: UserRole;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
    vehicles: Vehicle[];


}
