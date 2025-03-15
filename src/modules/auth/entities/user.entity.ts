import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/database/entities';
import { IsEmail } from 'class-validator';
import { UserRole, UserStatus } from '../types';

@Entity('user')
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  status!: UserStatus;

  @Column()
  role!: UserRole;
}
