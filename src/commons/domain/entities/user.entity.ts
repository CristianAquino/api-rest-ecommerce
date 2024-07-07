import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Auth } from './auth.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, default: null })
  name: string;

  @Column({ type: 'varchar', length: 64, default: null })
  first_name: string;

  @Column({ type: 'varchar', length: 64, default: null })
  second_name: string;

  @Column({ type: 'varchar', length: 128, default: null })
  address: string;

  @Column({ type: 'boolean', default: false })
  isRegistered: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAd: Date;

  @OneToOne(() => Auth, (auth) => auth.user)
  @JoinColumn()
  auth: Relation<Auth>;
}
