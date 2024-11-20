import { Exclude } from 'class-transformer';
import { ENUM_GENDER } from 'src/common/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'enum', enum: ENUM_GENDER, default: ENUM_GENDER.UNKNOWN })
  gender: ENUM_GENDER;
}
